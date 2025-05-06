package com.range.jarvana.service.impl

import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.exception.JarFileNotFoundException
import com.range.jarvana.mapper.JarMapper
import com.range.jarvana.repo.JarRepository
import com.range.jarvana.service.JarMetadataService
import org.springframework.data.jpa.repository.JpaRepository
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


    override fun findAll(): List<JarMetadataDto> {
        return jarRepository.findAll().map { JarMapper.jarFileToJarMetadata(it) }
    }
}