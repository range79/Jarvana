package com.range.jarvana.service.impl

import com.range.jarvana.exception.ExecutionNotFound
import com.range.jarvana.exception.JarFileNotFoundException
import com.range.jarvana.exception.JarFileNotRunningException
import com.range.jarvana.model.Execution
import com.range.jarvana.model.ExecutionStatus
import com.range.jarvana.repo.ExecutionRepository
import com.range.jarvana.repo.JarRepository
import com.range.jarvana.service.JarExecutionService
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader
import java.time.LocalDateTime


@Service
class JarExecutionServiceImpl(
    private val jarExecutionRepository: JarRepository,
    private val executionRepository: ExecutionRepository,

    ): JarExecutionService {
    private val log = LoggerFactory.getLogger(javaClass)
    private val processMap: MutableMap<Long, Process> = mutableMapOf()
    override fun run(id :Long): Execution {
        log.info("Executing jar execution with id $id")
        val jarFile = jarExecutionRepository.findById(id)
            .orElseThrow{
                log.error("Could not find jar file with id $id in repository")
                JarFileNotFoundException("Could not find jar file with id $id")
            }
        val tmpDir = System.getProperty("java.io.tmpdir")
        val filePath = "$tmpDir/${jarFile.name}"

        val tempFile = File(filePath)

        //write data to tempfile
        tempFile.writeBytes(jarFile.data)
        try {
            val process = ProcessBuilder("java", "-jar", tempFile.absolutePath)
                .redirectErrorStream(true)
                .start()

            processMap[process.pid()] = process
            return executionRepository.save(Execution(
                executionStatus = ExecutionStatus.RUNNING,
                pid = process.pid(),
                jarFile = jarFile,
                ))
        }
        catch (e: Exception) {

            return executionRepository.save(Execution(
                executionStatus = ExecutionStatus.FAILED,
                pid = null,
                jarFile = jarFile,
            ))
        }
    }

    override fun stop(id: Long): Execution {
        val execution = executionRepository.findById(id).orElseThrow{
            ExecutionNotFound("Execution with pid $id not found")
        }
        val pid =execution.pid
        return try {
            //kill the process
            val process = Runtime.getRuntime().exec(arrayOf("kill", "-9", pid.toString()))
            process.destroy()
            process.waitFor()
            processMap.remove(pid)

            if (process.exitValue() == 0) {
                execution.executionStatus = ExecutionStatus.KILLED
                execution.endedAt = LocalDateTime.now()
                executionRepository.save(execution)
            } else {
                throw ExecutionNotFound("Failed to kill process with pid $pid")
            }
        } catch (e: ExecutionNotFound) {
            log.error("Failed to kill process with pid $pid", e)
            execution.executionStatus = ExecutionStatus.FAILED
            execution.endedAt = LocalDateTime.now()
            executionRepository.save(execution)
        }}

    override fun read(id: Long): Flow<String> = flow {
        val execution: Execution = executionRepository.findById(id)
            .orElseThrow{
                ExecutionNotFound("Could not find execution with id $id in repository")
            }

        if (execution.executionStatus != ExecutionStatus.RUNNING) {
            throw JarFileNotRunningException("Jar file is not running")
        }

        val process = processMap[execution.pid]
            ?: throw IllegalStateException("Process not found in memory")
        BufferedReader(InputStreamReader(process.inputStream)).use { reader ->
            while (true) {
                val line = reader.readLine() ?: break
                emit(line)
            }
        }

    }
}
