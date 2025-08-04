package com.range.jarvana.service.impl

import JarStorageService
import com.range.jarvana.dto.JarDownloadDto
import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.exception.InvalidJarFileException
import com.range.jarvana.exception.JarFileNotFoundException
import com.range.jarvana.mapper.JarMapper
import com.range.jarvana.model.JarFile
import com.range.jarvana.repo.JarRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile

@Service
class JarStorageServiceImpl(
    private val jarRepository: JarRepository,
) : JarStorageService {

    private val log = LoggerFactory.getLogger(JarStorageServiceImpl::class.java)
    override fun upload(file: MultipartFile): JarMetadataDto {

        if (file.contentType.isNullOrBlank() || file.originalFilename.isNullOrBlank()) {
            log.error("MultipartFile content type is null or empty")
            throw InvalidJarFileException("File content type or name must not be null or empty")
        }

        return try {
            log.info("Uploading jar metadata")
            var fileName = file.originalFilename!!
            if (!fileName.endsWith(".jar")) {
                throw InvalidJarFileException("File name must end with a .jar file")
            }

            if (jarRepository.existsJarFilesByName(fileName)) {
                fileName = generateUniqueFilename(fileName) {
                    jarRepository.existsJarFilesByName(it)
                }
            }

            val jarFile = JarFile(
                name = fileName,
                size = file.size,
                data = file.bytes
            )
            log.info("Uploading jar metadata")
            //save it to repository
            val saved = jarRepository.save(jarFile)
            log.info("Jar metadata saved: ${saved.name}")
            JarMetadataDto(
                id = saved.id!!,
                name = saved.name,
                sizeInKb = saved.size,
                createdAt = saved.createdAt,
            )
        } catch (e: Exception) {
            log.error("file upload error")
            throw InvalidJarFileException("Unexpected error while uploading jar metadata"+e.message.toString())
        }
    }

    override fun download(id: Long): JarDownloadDto {

        val file = jarRepository.findById(id).orElseThrow{
            JarFileNotFoundException("Jar file not found")}
        return JarMapper.jarFileToJarDownload(file)
    }





    override fun delete(id: Long):JarMetadataDto {
        val jarFile = jarRepository.findById(id)
            .orElseThrow{JarFileNotFoundException("Jarfile not found with id: $id")}
        jarRepository.deleteById(id)
        return JarMapper.jarFileToJarMetadata(jarFile)
    }

    override fun deleteAll() {
        return jarRepository.deleteAll()
    }

    // a unique name generator function
    private fun generateUniqueFilename(originalFilename: String, exists: (String) -> Boolean): String {
        val dotIndex = originalFilename.lastIndexOf(".")
        val name = if (dotIndex != -1) originalFilename.substring(0, dotIndex) else originalFilename
        val extension = if (dotIndex != -1) originalFilename.substring(dotIndex) else ""

        var newName = originalFilename
        var counter = 1

        while (exists(newName)) {
            newName = "$name ($counter)$extension"
            counter++
        }

        return newName
    }
}
