const express = require("express");
const {
  getNotes,
  createNotes,
  getNoteById,
  updatNote,
  deleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleWare");
const router = express.Router();
router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNotes);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updatNote)
  .delete(protect, deleteNote);

module.exports = router;
