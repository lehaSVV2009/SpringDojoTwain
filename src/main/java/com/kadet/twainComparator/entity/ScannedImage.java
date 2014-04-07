package com.kadet.twainComparator.entity;

/**
 * Date: 05.04.14
 * Time: 21:59
 *
 * @author SarokaA
 */
public class ScannedImage {

    private String name;
    private byte[] bytes;

    public ScannedImage(String name, byte[] bytes) {
        this.name = name;
        this.bytes = bytes;
    }

    public String getName() {
        return name;
    }

    public byte[] getBytes() {
        return bytes;
    }
}
