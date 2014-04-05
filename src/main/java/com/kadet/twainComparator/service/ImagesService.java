package com.kadet.twainComparator.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

/**
 * Date: 05.04.14
 * Time: 22:01
 *
 * @author SarokaA
 */
@Service
public class ImagesService {

    public void putImages (List<File> images) {
        System.out.println("\nNumber of images for saving: " + images.size());
    }

}
