package com.range.jarvana.controller

import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.dto.ResponseDto
import com.range.jarvana.service.JarMetadataService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/info")
@RestController
class JarInfoController(private val service: JarMetadataService) {
private val log = LoggerFactory.getLogger(javaClass)

@GetMapping("/all")
    fun getAll(): ResponseEntity<ResponseDto<List<JarMetadataDto>>> {
        log.info("Getting all jars")
        val data = service.findAll()
        return ResponseEntity.ok(
            ResponseDto(
                success = true,
                message = "All jars list",
                data = data
            )
        )}


    @GetMapping("/{id}")
    fun getById(@PathVariable("id") id:Long):ResponseEntity<ResponseDto<JarMetadataDto>>{
        log.info("Getting artifact by id $id")
        val data = service.findById(id)
        return ResponseEntity.ok(ResponseDto(
            success = true,
            message = "Artifact by id $id",
            data = data
        )
        )
    }
}