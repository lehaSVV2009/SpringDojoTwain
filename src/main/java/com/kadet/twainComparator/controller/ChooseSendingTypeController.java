package com.kadet.twainComparator.controller;

import com.kadet.twainComparator.webEntity.SendingType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.xml.crypto.dsig.keyinfo.RetrievalMethod;

/**
 * Date: 05.04.14
 * Time: 17:10
 *
 * @author SarokaA
 */
@Controller
@RequestMapping(value = "/")
public class ChooseSendingTypeController {

    @RequestMapping(value = "/chooseSendingType", method = RequestMethod.POST)
    public String chooseSendFileType (@RequestParam("sendingType") SendingType sendingType) {
        if (sendingType == null) {
            return "redirect:/hello";
        }
        switch (sendingType) {
            case LOCAL_IMAGE: {
                return "redirect:/localImage";
            }
            case SCANNED_IMAGE: {
                return "redirect:/scanImage";
            }
            default: {
                return "redirect:/hello";
            }
        }
    }

}
