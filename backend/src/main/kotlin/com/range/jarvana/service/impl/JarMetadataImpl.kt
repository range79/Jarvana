package com.range.jarvana.service.impl

import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.exception.JarFileNotFoundException
import com.range.jarvana.mapper.JarMapper
import com.range.jarvana.repo.JarRepository
import com.range.jarvana.service.JarMetadataService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service

@Service
class JarMetadataImpl(private val jarRepository: JarRepository):JarMetadataService {
    override fun findById(id: Long): JarMetadataDto {
        //find id in db
        val jarFile = jarRepository.findById(id)
            .orElseThrow{ JarFileNotFoundException("Jarfile not found with id: $id") }
        return JarMetadataDto(
            id=jarFile.id!!,
            name = jarFile.name,
            sizeInKb = jarFile.size,
            createdAt = jarFile.createdAt,


            )
    }


    override fun findAll(size: Int, page: Int, direction : Sort.Direction,properties: String): Page<JarMetadataDto> {
        val pageable: Pageable = PageRequest.of(page, size, direction,properties )
        return jarRepository.findAll(pageable).map { JarMapper.jarFileToJarMetadata(it) }
    }
}