package com.range.jarvana.service

import com.range.jarvana.dto.JarMetadataDto

interface JarMetadataService {
    fun findById(id: Long):JarMetadataDto
    fun findAll(): List<JarMetadataDto>
}
