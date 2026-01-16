package com.example.backend.rest;

import com.example.backend.dao.NoteRepository;
import com.example.backend.domain.Note;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteResourceImpl implements NoteResource {

  private final NoteRepository noteRepository;

  @Override
  public List<Note> getNotes() {
    return noteRepository.findAll();
  }

  @Override
  public Note createNote(Note note) {
    return noteRepository.save(note);
  }

  @Override
  public Note getNoteById(Long id) {
    return noteRepository.findById(id).orElseThrow(NotFoundException::new);
  }

  @Override
  public Note updateNote(Long id, Note note) {
    Note existingNote =
        noteRepository.findById(id).orElseThrow(NotFoundException::new);
    existingNote.setText(note.getText());
    return noteRepository.save(existingNote);
  }
}
