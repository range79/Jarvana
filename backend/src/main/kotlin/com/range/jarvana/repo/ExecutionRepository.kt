package com.range.jarvana.repo

import com.range.jarvana.dto.ExecutionResponseDto
import com.range.jarvana.model.Execution
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional
import javax.swing.text.html.Option

interface ExecutionRepository: JpaRepository<Execution, Long> {
    fun findByPid(pid:Long): Optional<Execution>
}