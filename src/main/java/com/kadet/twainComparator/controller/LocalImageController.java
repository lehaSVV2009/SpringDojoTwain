package com.kadet.twainComparator.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Date: 05.04.14
 * Time: 17:47
 *
 * @author SarokaA
 */
@Controller
@RequestMapping
public class LocalImageController {

    @RequestMapping(value = "/localImage")
    public String showLocalImagePage () {
        return "localImage";
    }






}
