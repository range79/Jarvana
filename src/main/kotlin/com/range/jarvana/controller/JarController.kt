package com.range.jarvana.controller

import JarStorageService
import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.dto.ResponseDto
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RequestMapping("/jars")
@RestController
class JarController(private val service: JarStorageService) {
    private var log = LoggerFactory.getLogger(javaClass)

    @GetMapping("/download/{id}")
    fun downloadJar(@PathVariable("id") id: Long): ResponseEntity<ByteArray> {

        val download = service.download(id)

        val headers = HttpHeaders()

        headers.contentType = MediaType.APPLICATION_OCTET_STREAM

        headers.set(
            HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\"${download.filename}\""
        )

        return ResponseEntity
            .ok()
            .headers(headers)
            .body(download.content)

    }


    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/upload")
    fun upload(@RequestBody file: MultipartFile): JarMetadataDto {
        return service.upload(file)


    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/delete/{id}")
    fun deleteSingleJar(@PathVariable id: Long) {

        log.info("Deleting single jar $id")

        service.delete(id)


    }


    @ResponseStatus(HttpStatus.ACCEPTED)
    @DeleteMapping("/delete/all")
    fun deleteAllJar() {

        log.info("Deleting all jar")

        service.deleteAll()

    }
}
