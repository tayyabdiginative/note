const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});
const createNotes = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.send({
      message: "Please Fill All the above fields",
    });
  } else {
    const note = new Note({ user: req.user._id, title, content, category });
    const createNote = await note.save();
    res.status(201).json(createNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
  res.json(note);
});

const updatNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== note.user._id.toString()) {
    res.send({
      message: "You Can not perform this action",
    });
  }
  if (note) {
    (note.title = title), (note.content = content), (note.category = category);
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.send({
      message: "Note not Found",
    });
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user.toString() !== note.user._id.toString()) {
    res.send({
      message: "You Can not perform this action",
    });
  }
  if (note) {
    await note.remove();
    res.json({ message: "Note removed" });
  } else {
    res.send({
      message: "Note not Found",
    });
  }
});
module.exports = { getNotes, createNotes, getNoteById, updatNote, deleteNote };
