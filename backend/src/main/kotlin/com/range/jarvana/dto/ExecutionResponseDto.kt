package com.range.jarvana.dto

import com.range.jarvana.model.ExecutionStatus
import com.range.jarvana.model.JarFile
import jakarta.persistence.*
import java.time.LocalDateTime

data class ExecutionResponseDto (
    var id:Long?= null,

    var pid:Long?= null,

    var executionStatus: ExecutionStatus?= ExecutionStatus.PENDING,

    var startedAt: LocalDateTime = LocalDateTime.now(),

    var endedAt: LocalDateTime?= null,


)