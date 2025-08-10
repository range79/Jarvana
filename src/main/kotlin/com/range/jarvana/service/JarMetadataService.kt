package com.range.jarvana.service

import com.range.jarvana.dto.JarMetadataDto
import org.springframework.data.domain.Page
import org.springframework.data.domain.Sort

interface JarMetadataService {
    fun findById(id: Long):JarMetadataDto
    fun findAll(size: Int, page: Int, direction : Sort.Direction,properties: String): Page<JarMetadataDto>
}
