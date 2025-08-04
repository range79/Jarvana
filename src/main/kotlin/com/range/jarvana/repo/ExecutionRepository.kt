package com.range.jarvana.repo

import com.range.jarvana.model.Execution
import org.springframework.data.jpa.repository.JpaRepository

interface ExecutionRepository: JpaRepository<Execution, Long> {
}