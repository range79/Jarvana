package com.range.jarvana.service.impl

import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.exception.JarFileNotFoundException
import com.range.jarvana.mapper.JarMapper
import com.range.jarvana.model.JarFile
import com.range.jarvana.repo.JarRepository
import com.range.jarvana.service.JarMetadataService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import java.time.LocalDateTime
import java.util.*

class JarMetadataImplTest {
    private lateinit var jarRepository: JarRepository
    private lateinit var jarMetadataService: JarMetadataService
    private lateinit var jarFile: JarFile
    private lateinit var jarFile1: JarFile

    @BeforeEach
    fun setUp() {
        jarRepository= Mockito.mock(JarRepository::class.java)
        jarMetadataService = JarMetadataImpl(jarRepository)
        jarFile= JarFile(id = 1, name = "aa", size = 1L, LocalDateTime.now(), data = ByteArray(0), executions = emptyList())
        jarFile1 = JarFile(id = 1, name = "bbb", size = 1, data = ByteArray(0), executions = emptyList())
    }

    @Test
    fun `findById should return JarMetadataDto when jar exists`() {
        Mockito.`when`(jarRepository.findById(1)).thenReturn(Optional.of(jarFile))
        val result = jarMetadataService.findById(1)
        val expected = JarMapper.jarFileToJarMetadata(jarFile)
        assertThat(result).isEqualTo(expected)
    }

    @Test
    fun `findById should return JarMetadataDto when jar does not exist`() {
        Mockito.`when`(jarRepository.findById(1)).thenReturn(Optional.empty())

        assertThrows<JarFileNotFoundException> { jarMetadataService.findById(1) }
    }

//    @Test
//    fun `findall should be empty list`() {
//        Mockito.`when`(jarRepository.findAll()).thenReturn(emptyList())
//        val expected = emptyList<JarMetadataDto>()
//        assertEquals(expected, jarMetadataService.findAll(
//            size = 10,
//            page = 0,
//            direction = Sort.Direction.ASC,
//            properties = "time"
//        ))
//    }
//
//    @Test
//    fun `findAll should return a list of jarMetadata`() {
//        val jarFileList = listOf(jarFile, jarFile1)
//        val pageable = PageRequest.of(0, 10, Sort.Direction.ASC, "time")
//        val jarFilePage: Page<JarFile> = PageImpl(jarFileList, pageable, jarFileList.size.toLong())
//
//        Mockito.`when`(jarRepository.findAll(pageable)).thenReturn(jarFilePage)
//
//        val expectedMetadata = jarFileList.map { JarMapper.jarFileToJarMetadata(it) }
//
//        val actualMetadata = jarMetadataService.findAll(
//            size = 10,
//            page = 0,
//            direction = Sort.Direction.ASC,
//            properties = "time"
//        )
//
//        // Assert
//        assertEquals(expectedMetadata, actualMetadata)
//    }
}