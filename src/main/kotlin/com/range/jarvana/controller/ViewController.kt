package com.range.jarvana.controller

import ch.qos.logback.core.model.Model
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class ViewController {
@GetMapping("/")
fun home(): String {
    return "main"
}
    @GetMapping("/control-panel")
fun controlPanel(): String {
    return "control"
}

}