package com.kadet.twainComparator.controller;

import com.kadet.twainComparator.service.ImagesService;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

/**
 * Date: 05.04.14
 * Time: 17:09
 *
 * @author SarokaA
 */
@Controller
@RequestMapping
public class ScanController {

    private String BEGIN_OF_SCANNED_IMAGES_NAMES = "scannedImage";

    @Autowired
    private ImagesService imagesService;

    @RequestMapping(value = "/scanImage")
    public String showScanPage() {
        return "scanImage";
    }

    @RequestMapping(value = "/sendScannedImages", method = RequestMethod.POST)
    public String sendScannedImages(HttpServletRequest request) {

        List<File> images = new ArrayList<File>();
        Enumeration enumeration = request.getParameterNames();
        List<String> scannedImagesNames = new ArrayList<String>();
        while (enumeration.hasMoreElements()) {
            String parameterName = (String) enumeration.nextElement();
            if (parameterName.startsWith(BEGIN_OF_SCANNED_IMAGES_NAMES)) {
                scannedImagesNames.add(parameterName);
            }
        }
        if (scannedImagesNames.size() == 0) {
            return "operationFailed";
        }
        try {

            for (String imageName : scannedImagesNames) {
                File image = new File("d:/" + imageName);
                String base64Image = request.getParameter(imageName);
                boolean fileIsCreated = image.createNewFile();
                if (fileIsCreated) {
                    byte[] bytes = Base64.decodeBase64(base64Image.getBytes());
                    FileOutputStream stream = new FileOutputStream(image);
                    try {
                        stream.write(bytes);
                        images.add(image);
                    } finally {
                        stream.close();
                    }
                }
            }

            imagesService.putImages(images);

        } catch (IOException e) {
            return "operationFailed";
        }


        return "operationSucceed";
    }

}
