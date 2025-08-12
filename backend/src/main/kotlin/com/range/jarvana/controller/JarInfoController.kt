package com.range.jarvana.controller

import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.service.JarMetadataService
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Page
import org.springframework.data.domain.Sort
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/info")
@RestController
class JarInfoController(private val service: JarMetadataService) {
    private val log = LoggerFactory.getLogger(javaClass)

    @GetMapping("/all")
    fun getAll(@RequestParam(defaultValue = "10") size: Int,
               @RequestParam(defaultValue = "0") page: Int,
               @RequestParam(defaultValue = "ASC") direction: Sort.Direction,
               @RequestParam(defaultValue = "id") properties: String): Page<JarMetadataDto> {
        log.info("Getting all jars")
        return service.findAll(size,page,direction,properties);

    }
    @GetMapping("/{id}")
    fun getById(@PathVariable("id") id:Long):JarMetadataDto{

        log.info("Getting artifact by id $id")

        return service.findById(id)
    }
}