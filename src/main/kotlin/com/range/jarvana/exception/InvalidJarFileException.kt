package com.range.jarvana.exception

import org.springframework.http.HttpStatus

class InvalidJarFileException(name:String): AbstractExceptionHandler(name, HttpStatus.BAD_REQUEST)