package com.kadet.twainComparator.service;

import com.kadet.twainComparator.entity.ScannedImage;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * Date: 05.04.14
 * Time: 22:01
 *
 * @author SarokaA
 */
@Service
public class ImagesService {

    public boolean putImages(List<ScannedImage> images) {
        System.out.println("\nNumber of images for saving: " + images.size());
        try {
            for (ScannedImage scannedImage : images) {
                File image = new File("d:/" + scannedImage.getName());
                boolean fileIsCreated = image.createNewFile();
                if (fileIsCreated) {
                    byte[] bytes = scannedImage.getBytes();
                    FileOutputStream stream = new FileOutputStream(image);
                    try {
                        stream.write(bytes);
                    } finally {
                        stream.close();
                    }
                }
            }
        } catch (IOException e) {
            return false;
        }
        return true;
    }

}
