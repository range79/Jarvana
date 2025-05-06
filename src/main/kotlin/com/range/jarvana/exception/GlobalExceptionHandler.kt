package com.range.jarvana.exception

import com.range.jarvana.dto.ResponseDto

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.io.FileNotFoundException

    @ControllerAdvice
    class GlobalExceptionHandler {

        private val log = LoggerFactory.getLogger(javaClass)

        @ExceptionHandler(JarFileNotFoundException::class)
        fun handleJarNotFound(e: JarFileNotFoundException): ResponseEntity<ResponseDto<Nothing>> {
            log.error("JarFileNotFound: ${e.message}")
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ResponseDto(false, e.message ?: "Jar not found"))
        }

        @ExceptionHandler(ExecutionNotFound::class)
        fun handleExecNotFound(e: ExecutionNotFound): ResponseEntity<ResponseDto<Nothing>> {
            log.error("ExecutionNotFound: ${e.message.toString()}")
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ResponseDto(false, e.message ?: "Execution not found"))
        }

        @ExceptionHandler(FileNotFoundException::class)
        fun handleFileNotFound(e: FileNotFoundException): ResponseEntity<ResponseDto<Nothing>> {
            log.error("FileNotFoundException: ${e.message}")
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ResponseDto(false, e.message ?: "File not found"))
        }
        @ExceptionHandler(InvalidJarFileException::class)
        fun handleInvalidFormat(e: InvalidJarFileException): ResponseEntity<ResponseDto<Nothing>> {
            log.error("InvalidFormatException: ${e.message}")
            return  ResponseEntity(ResponseDto(false, e.message ?: "Invalid format"), HttpStatus.BAD_REQUEST)
        }

    }




