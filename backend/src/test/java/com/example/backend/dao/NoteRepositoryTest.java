package com.example.backend.dao;

import com.example.backend.domain.Note;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
class NoteRepositoryTest {

    @Autowired
    private NoteRepository noteRepository;

    @Test
    void shouldSaveAndFindNote() {
        Note note = new Note("Hello World");
        Note savedNote = noteRepository.save(note);

        assertNotNull(savedNote.getId());
        assertEquals("Hello World", savedNote.getText());

        Note foundNote = noteRepository.findById(savedNote.getId()).orElseThrow();
        assertEquals("Hello World", foundNote.getText());
    }
}