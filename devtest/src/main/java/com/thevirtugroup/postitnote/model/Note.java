package com.thevirtugroup.postitnote.model;

public class Note {
    private String name;
    private String text;

    private int id;

    public Note(String name, String text, int id) {
        this.name = name;
        this.text = text;
        this.id = id;
    }

    @Override
    public String toString() {
        return "Note{" +
                "name='" + name + '\'' +
                ", text='" + text + '\'' +
                ", id=" + id +
                '}';
    }

    public String getName() {
        return name;
    }

    public String getText() {
        return text;
    }

    public int getId() {
        return id;
    }
}
