const express = require("express"),
  asyncMiddleware = require("express-async-handler"),
  noteCtrl = require("../controllers/noteController"),
  router = express.Router();

router.post("/note/create", asyncMiddleware(noteCtrl.createNote));
router.get("/note/notes", asyncMiddleware(noteCtrl.getAllNotes));
router.get("/note/notes/:id", asyncMiddleware(noteCtrl.getNoteById));
router.put("/note/update/:id", asyncMiddleware(noteCtrl.updateNoteById));
router.delete("/note/delete/:id", asyncMiddleware(noteCtrl.deleteNoteById));

module.exports = router;
