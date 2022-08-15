package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
class HelloController {

    @GetMapping("hello")
    public String hello(Model model){

        model.addAttribute("data", "spring!!!21");
        return "hello";


    }
}
