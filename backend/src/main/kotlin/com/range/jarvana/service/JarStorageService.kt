import com.range.jarvana.dto.JarDownloadDto
import com.range.jarvana.dto.JarMetadataDto
import com.range.jarvana.model.JarFile
import org.springframework.web.multipart.MultipartFile

interface JarStorageService {
    fun upload(file: MultipartFile): JarMetadataDto
    fun download(id: Long): JarDownloadDto
    fun delete(id: Long): JarMetadataDto
    fun deleteAll()
}
