package com.range.jarvana.repo

import com.range.jarvana.model.JarFile
import org.springframework.data.jpa.repository.JpaRepository

interface JarRepository: JpaRepository<JarFile, Long> {
    fun existsJarFilesByName(name: String): Boolean
}