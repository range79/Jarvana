package com.range.jarvana.service.impl

import JarStorageService
import com.range.jarvana.exception.InvalidJarFileException
import com.range.jarvana.exception.JarFileNotFoundException
import com.range.jarvana.mapper.JarMapper
import com.range.jarvana.model.JarFile
import com.range.jarvana.repo.JarRepository
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.ArgumentCaptor
import org.mockito.Mockito.*
import org.springframework.web.multipart.MultipartFile
import java.time.LocalDateTime
import java.util.*
import kotlin.test.assertEquals


class JarStorageServiceImplTest {

 private lateinit var jarStorageService: JarStorageService
 private lateinit var jarRepository: JarRepository
 private lateinit var multipartFile: MultipartFile
 private lateinit var dummyJarFile: JarFile
 @BeforeEach
 fun setUp() {
  jarRepository= mock(JarRepository::class.java)
  jarStorageService= JarStorageServiceImpl(jarRepository)
  multipartFile= mock(MultipartFile::class.java)
  dummyJarFile = JarFile(id=1 ,name="dummy file", size =5, LocalDateTime.now(),ByteArray(0), executions = emptyList() )
 }
 private fun mockMultipartFile(): MultipartFile {
  val file = multipartFile
  `when`(file.originalFilename).thenReturn("aa.jar")
  `when`(file.name).thenReturn("aa.jar")
  `when`(file.size).thenReturn(100)
  `when`(file.bytes).thenReturn(byteArrayOf(1, 2, 3))
  `when`(file.contentType).thenReturn("application/java-archive")
  return file
 }

 @Test
 fun `should save user when give true info`() {

  `when`(jarRepository.save(any())).thenReturn(dummyJarFile)

  jarStorageService.upload(mockMultipartFile())

  val captor =ArgumentCaptor.forClass(JarFile::class.java)

  verify(jarRepository).save(captor.capture())
 }
 @Test
 fun `should throw exception when give diffent file`(){

  val file:MultipartFile = multipartFile

  `when`(file.originalFilename).thenReturn("")

  `when`(file.contentType).thenReturn("")

  assertThrows<InvalidJarFileException> { jarStorageService.upload(file)  }

 }


 @Test
 fun `should download file give existing file`() {

  `when`(jarRepository.findById(1)).thenReturn(Optional.of(dummyJarFile))

  val expected =jarStorageService.download(1)

  assertEquals(expected, JarMapper.jarFileToJarDownload(dummyJarFile))

 }
 @Test
 fun `should download file give not existing file`() {
  `when`(jarRepository.findById(1)).thenReturn(Optional.empty())

  assertThrows<JarFileNotFoundException> {  jarStorageService.download(1) }
 }

 @Test
 fun `should delete user with id `() {

  `when`(jarRepository.findById(1)).thenReturn(Optional.of(dummyJarFile))

  doNothing().`when`(jarRepository).deleteById(any())

  jarStorageService.delete(1)

  verify(jarRepository).deleteById(1)
 }
 @Test
 fun `should throw exception if user not exits`(){

  `when`(jarRepository.findById(1)).thenReturn(Optional.empty())


  assertThrows<JarFileNotFoundException> { jarStorageService.delete(1) }
 }


 @Test
 fun deleteAll() {

  doNothing().`when`(jarRepository).deleteAll()

  jarStorageService.deleteAll()

  verify(jarRepository).deleteAll()
 }
}