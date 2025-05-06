package com.range.jarvana.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "jar")
data class JarFile(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id:Long? = null,
    @Column( nullable = false)
    var name:String = "",
    var size:Long = 0L,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    @Lob
    @Column(nullable = false)
    var data:ByteArray = ByteArray(0),
    @OneToMany(mappedBy = "jarFile", cascade = [CascadeType.ALL])
    val executions: List<Execution> = emptyList()


) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as JarFile

        if (id != other.id) return false
        if (size != other.size) return false
        if (name != other.name) return false
        if (createdAt != other.createdAt) return false
        if (!data.contentEquals(other.data)) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id?.hashCode() ?: 0
        result = 31 * result + size.hashCode()
        result = 31 * result + name.hashCode()
        result = 31 * result + createdAt.hashCode()
        result = 31 * result + data.contentHashCode()
        return result
    }
}

