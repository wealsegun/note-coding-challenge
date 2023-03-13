const express = require("express"),
  asyncMiddleware = require("express-async-handler"),
  noteCtrl = require("../controllers/noteController"),
  router = express.Router();
  authMiddleware = require('../utils/authMiddleware');

router.post("/note/create", authMiddleware, asyncMiddleware(noteCtrl.createNote));
router.get("/note/notes", authMiddleware, asyncMiddleware(noteCtrl.getAllNotes));
router.get("/note/notes/:id", authMiddleware, asyncMiddleware(noteCtrl.getNoteById));
router.put("/note/update/:id", authMiddleware, asyncMiddleware(noteCtrl.updateNoteById));
router.delete("/note/delete/:id", authMiddleware,asyncMiddleware(noteCtrl.deleteNoteById));

module.exports = router;
