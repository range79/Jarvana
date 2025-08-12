package com.range.jarvana.dto

import java.time.LocalDateTime

data class ResponseDto <T>(
    val success:Boolean,
    val message:String,
    val timestamp: LocalDateTime =LocalDateTime.now(),
    val data: T? = null
)