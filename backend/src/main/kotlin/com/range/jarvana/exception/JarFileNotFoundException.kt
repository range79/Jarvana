package com.range.jarvana.exception

import org.springframework.http.HttpStatus

class JarFileNotFoundException(name:String): AbstractExceptionHandler(name, HttpStatus.NOT_FOUND)