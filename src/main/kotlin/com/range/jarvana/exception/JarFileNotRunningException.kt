package com.range.jarvana.exception

import org.springframework.http.HttpStatus
import java.lang.Exception

class JarFileNotRunningException(name:String): AbstractExceptionHandler(name, HttpStatus.BAD_REQUEST)