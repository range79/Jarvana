package com.range.jarvana.service.impl

import com.range.jarvana.model.JarFile
import com.range.jarvana.repo.JarRepository
import com.range.jarvana.service.JarMetadataService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito

class JarMetadataImplTest {
  private lateinit var jarRepository: JarRepository
  private lateinit var jarMetadataService: JarMetadataService
  @BeforeEach
 fun setUp() {
     jarRepository= Mockito.mock(JarRepository::class.java)


 }

@Test
 fun findById() {
     Mockito.`when`(jarRepository.findById(1)).thenReturn(JarFile(id = 1, name = "xxx.jar", data = byteArrayOf("")

     ))
 }

@Test
 fun findAll() {}
}