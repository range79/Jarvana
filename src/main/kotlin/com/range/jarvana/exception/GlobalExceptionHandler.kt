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

        @ExceptionHandler(AbstractExceptionHandler::class)
        fun handleJarNotFound(e: AbstractExceptionHandler): ResponseEntity<ResponseDto<Nothing>> {
            log.error("JarFileNotFound: ${e.message}")
            return ResponseEntity.status(e.httpStatus)
                .body(ResponseDto(false, e.message ?: "Jar not found"))
        }

        @ExceptionHandler(Exception::class)
        fun handleExecNotFound(e: Exception): ResponseEntity<ResponseDto<Nothing>> {
            log.error("ExecutionNotFound: ${e.message.toString()}")
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ResponseDto(false, e.message ?: "Internal Server Error" ))
        }



    }




