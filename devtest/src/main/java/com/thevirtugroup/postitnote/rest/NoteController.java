package com.thevirtugroup.postitnote.rest;

import com.thevirtugroup.postitnote.model.NoteDto;
import com.thevirtugroup.postitnote.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 *
 */
@RestController
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @RequestMapping(value = "/api/notes", method = RequestMethod.GET)
    public ResponseEntity<List<NoteDto>> findAll() {
        return new ResponseEntity<>(noteService.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/notes", method = RequestMethod.POST)
    public ResponseEntity<NoteDto> addNote(@RequestBody NoteDto noteDto) {
        return new ResponseEntity<>(noteService.addNote(noteDto), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/notes/delete", method = RequestMethod.POST)
    public ResponseEntity<NoteDto> deleteNote(@RequestBody NoteDto noteDto) {
        if (noteService.deleteNote(noteDto) != null) {
            return new ResponseEntity<>(noteDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(noteDto, HttpStatus.NOT_FOUND);
    }
}
