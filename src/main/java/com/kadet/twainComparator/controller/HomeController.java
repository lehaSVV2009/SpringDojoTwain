package com.kadet.twainComparator.controller;

import com.kadet.twainComparator.util.Constants;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


/**
 * Created with IntelliJ IDEA.
 * User: admin
 * Date: 1/8/13
 * Time: 9:19 PM
 * To change this template use File | Settings | File Templates.
 */

@Controller
@RequestMapping(value = "/")
public class HomeController {


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() {
        return "redirect:/hello";
    }


    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String home() {
        System.out.println("Hello!");
        return Constants.INDEX_JSP;
    }



    @RequestMapping(value = "/example2", method = RequestMethod.GET)
    public String example2() {
        System.out.println("Example2");
        return "example2";
    }


    @RequestMapping(value = "/example1", method = RequestMethod.GET)
    public String example1() {
        System.out.println("Example1!");
        return "example1";
    }





    @RequestMapping(value = "/Scan", method = RequestMethod.GET)
    public String scanImage() {
        System.out.println("456");
        return "ScanImage";
    }


    @RequestMapping(value = "/validate", method = RequestMethod.GET)
    public @ResponseBody Boolean validateForm(@RequestParam("value") String value) {
        System.out.println("Validation value: " + value);
        return !"".equals(value);
    }

}