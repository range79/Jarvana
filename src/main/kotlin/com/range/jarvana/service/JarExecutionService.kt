package com.range.jarvana.service

import com.range.jarvana.dto.ExecutionResponseDto
import com.range.jarvana.model.Execution
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow


interface JarExecutionService {
    fun run(id:Long): ExecutionResponseDto
    fun stop(id: Long): ExecutionResponseDto
    fun read(id: Long): Flow<String> = flow {  }
}