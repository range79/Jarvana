package com.range.jarvana.controller

import JarStorageService
import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.dto.ResponseDto

import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RequestMapping("/jars")
@RestController
class JarController(private val service: JarStorageService) {
    private var log = LoggerFactory.getLogger(javaClass)
    @PostMapping("/upload")
    fun upload(@RequestBody file: MultipartFile): ResponseEntity<ResponseDto<JarMetadataDto>>{
        log.info("Uploading file ${file.originalFilename}")
        val data= service.upload(file)
        return ResponseEntity.ok(ResponseDto(
            success = true,
            message= "File uploaded successfully",
            data=data
        )
        )
    }
    @DeleteMapping("/delete/{id}")
    fun deleteSingleJar(@PathVariable id:Long):ResponseEntity<ResponseDto<JarMetadataDto>>{
        log.info("Deleting single jar $id")
        val data =service.delete(id)
        return ResponseEntity.ok(ResponseDto(
            success = true,
            message= "File deleted successfully",
            data = data
        )
        )
    }
    @DeleteMapping("/delete/all")
    fun deleteAllJar():ResponseEntity<ResponseDto<Nothing>>{
        log.info("Deleting all jar")
        service.deleteAll()
        return ResponseEntity.ok(ResponseDto(
            success = true,
            message = "All jars deleted",
            data = null
        )
        )
    }
}

