package com.thevirtugroup.postitnote.service;

import com.thevirtugroup.postitnote.model.Note;
import com.thevirtugroup.postitnote.model.NoteDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {
    public List<Note> notes = new ArrayList<>();

    public List<NoteDto> findAll() {
        return notes.stream()
                .map(note -> new NoteDto(note.getName(), note.getText(), note.getId()))
                .collect(Collectors.toList());
    }

    public NoteDto addNote(NoteDto noteDto) {
        if (notes.stream().anyMatch(note -> note.getId() == noteDto.getId())) {
            notes.set(noteDto.getId(), new Note(noteDto.getName(), noteDto.getText(), noteDto.getId()));
        } else {
            Note note = new Note(noteDto.getName(), noteDto.getText(), notes.size());
            notes.add(note);
        }
        return noteDto;
    }

    public NoteDto deleteNote(NoteDto noteDto) {
        if (notes.stream().anyMatch(note -> note.getId() == noteDto.getId())) {
            notes.remove(noteDto.getId());
            return noteDto;
        }
        return null;
    }
}
