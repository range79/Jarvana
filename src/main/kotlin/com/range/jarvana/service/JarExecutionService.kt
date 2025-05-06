package com.range.jarvana.service

import com.range.jarvana.model.Execution
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow


interface JarExecutionService {
    fun run(id:Long): Execution
    fun stop(id: Long): Execution
    fun read(id: Long): Flow<String> = flow {  }
}