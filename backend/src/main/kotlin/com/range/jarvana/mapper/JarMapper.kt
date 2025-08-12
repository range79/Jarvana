package com.range.jarvana.mapper

import com.range.jarvana.dto.JarDownloadDto
import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.model.JarFile

object JarMapper {
    fun jarFileToJarMetadata(jarFile: JarFile): JarMetadataDto {

        return JarMetadataDto(
            id = jarFile.id,
            name = jarFile.name,
            createdAt = jarFile.createdAt,
            sizeInKb = jarFile.size,
        )
    }
    fun jarFileToJarDownload(jarFile: JarFile): JarDownloadDto {
        return JarDownloadDto(
            filename = jarFile.name,

            content = jarFile.data
        )
    }
}