package com.range.jarvana.mapper

import com.range.jarvana.dto.ExecutionResponseDto
import com.range.jarvana.model.Execution

object ExecutionMapper {
    fun executionToExecutionResponseDto(execution: Execution): ExecutionResponseDto {
        return ExecutionResponseDto(
            id = execution.id,
            pid = execution.pid,
            executionStatus = execution.executionStatus,
            startedAt = execution.startedAt,
            endedAt = execution.endedAt,
        )
    }
}