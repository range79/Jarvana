package com.range.jarvana.controller

import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.service.JarMetadataService
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/info")
@RestController
class JarInfoController(private val service: JarMetadataService) {
    private val log = LoggerFactory.getLogger(javaClass)

    @GetMapping("/all")
    fun getAll():List<JarMetadataDto> {

        log.info("Getting all jars")
        return service.findAll();

    }
    @GetMapping("/{id}")
    fun getById(@PathVariable("id") id:Long):JarMetadataDto{

        log.info("Getting artifact by id $id")

        return service.findById(id)
    }
}