package com.example.backend.rest;

import com.example.backend.domain.Note;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/notes")
public interface NoteResource {

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  List<Note> getNotes();

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  Note createNote(Note note);

  @GET
  @Path("/{id}")
  @Produces(MediaType.APPLICATION_JSON)
  Note getNoteById(@PathParam("id") Long id);

  @PUT
  @Path("/{id}")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  Note updateNote(@PathParam("id") Long id, Note note);
}
