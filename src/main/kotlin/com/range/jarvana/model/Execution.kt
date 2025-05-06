package com.range.jarvana.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "execution")
data class Execution(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id:Long?= null,

    var pid:Long?= null,
    @Enumerated(EnumType.STRING)
    @Column( name = "execution_status")
    var executionStatus: ExecutionStatus?= ExecutionStatus.PENDING,

    var startedAt: LocalDateTime= LocalDateTime.now(),

    var endedAt: LocalDateTime?= null,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="Jar_id",nullable = false)
    var jarFile: JarFile?=null

)
