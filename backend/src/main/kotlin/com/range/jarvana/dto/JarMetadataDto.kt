package com.range.jarvana.dto

import com.range.jarvana.model.ExecutionStatus
import java.time.LocalDateTime

data class JarMetadataDto (
    val id:Long?,
    val name: String,
    val sizeInKb: Long,
    val createdAt: LocalDateTime,

)