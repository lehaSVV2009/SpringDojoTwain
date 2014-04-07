package com.kadet.twainComparator.controller;

import com.kadet.twainComparator.util.Constants;
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
        return Constants.LOCAL_IMAGE_JSP;
    }






}
