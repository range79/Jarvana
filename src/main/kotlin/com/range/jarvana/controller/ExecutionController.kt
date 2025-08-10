package com.range.jarvana.controller

import com.range.jarvana.dto.ExecutionResponseDto
import com.range.jarvana.dto.ResponseDto
import com.range.jarvana.model.Execution
import com.range.jarvana.service.JarExecutionService
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.Operation
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/exec")
class ExecutionController(private val executionService: JarExecutionService) {
    @Operation(summary = "Execute jar with id")
    @GetMapping("/{id}")
    fun getExecution(@PathVariable("id") id: Long):ExecutionResponseDto  {
        return  executionService.run(id)
    }
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/stop/{id}")
    fun stopExecution(@PathVariable("id") id: Long)  {
         executionService.stop(id = id)
    }
    @Operation(summary = "Read jar with id returns TextEventStream")
    @GetMapping("/stream/{id}", produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun streamExecution(@PathVariable id: Long): Flow<String> {
        return executionService.read(id)

    }



}