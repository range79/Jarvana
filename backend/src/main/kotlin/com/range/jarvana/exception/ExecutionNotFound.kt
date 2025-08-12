package com.range.jarvana.exception

import org.springframework.http.HttpStatus
import java.net.HttpURLConnection.HTTP_NOT_FOUND

class ExecutionNotFound(name:String): AbstractExceptionHandler(name, HttpStatus.NOT_FOUND){}