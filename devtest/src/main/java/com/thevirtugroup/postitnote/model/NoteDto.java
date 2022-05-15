package com.thevirtugroup.postitnote.model;

public class NoteDto {
    private String name;
    private String text;

    private int id;

    public NoteDto() {
    }

    public NoteDto(String name, String text, int id) {
        this.name = name;
        this.text = text;
        this.id = id;
    }

    @Override
    public String toString() {
        return "NoteDto{" +
                "name='" + name + '\'' +
                ", text='" + text + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getText() {
        return text;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setText(String text) {
        this.text = text;
    }
}
