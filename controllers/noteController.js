const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const authJson = path.resolve(__dirname, "../config/auth.json");
const shortid = require("shortid");
const noteJson = path.resolve(__dirname, "../config/note.json");
const ID = shortid.generate();
// console.log();

module.exports.createNote = async (req, res) => {
  try {
    if (req.body.title && req.body.content && req.body.user_id) {
      const title = req.body.title;
      const content = req.body.content;
      const user_id = req.body.user_id;

      //   console.log(req.user);
      let _user = req.user?.id;

      //   console.log(_user)

      const note = {
        id: ID,
        title: title,
        content: content,
        user_id: user_id,
        dateCreated: Date.now(),
        updatedDate: null,
      };

      let userList = JSON.parse(fs.readFileSync(authJson).toString());

      const findUser = userList.find((c) => c.id === note.user_id);

      if (!findUser) {
        return res.status(400).json({
          status: 400,
          message: "User not found",
          data: null,
        });
      }

      let existingArray = JSON.parse(fs.readFileSync(noteJson).toString());
      console.log(existingArray);
      if (existingArray) {
        const arrayTosave = [];
        // arrayTosave.pus
        arrayTosave.push(note);
        existingArray = [...existingArray, ...arrayTosave];
        console.log(existingArray);

        try {
          fs.writeFileSync(noteJson, JSON.stringify(existingArray));
          return res.status(200).json({
            status: 200,
            message: "Note saved successfully",
            data: note,
          });
        } catch (error) {
          console.log(error);
          return res.status(400).json({
            status: 400,
            message: "Error occurred",
            data: error.message,
          });
        }
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: "title, content, and user_id are required fields",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error.message,
    });
  }
};

module.exports.getAllNotes = async (req, res) => {
  try {
    let existingArray = JSON.parse(fs.readFileSync(noteJson).toString());
    let newNotes = [];
    for (let i = 0; i < existingArray.length; i++) {
      const element = existingArray[i];

      const note = {
        id: element.id,
        title: element.title,
        content: element.content,
        user_id: element.user_id,
        dateCreated: new Date(element.dateCreated),
      };
      newNotes.push(note);
      console.log(newNotes);
    }

    return res.status(200).json({
      status: 200,
      message: null,
      data: newNotes,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error,
    });
  }
};

module.exports.getNoteById = async (req, res) => {
  try {
    console.log(req.params.id);
    if (req.params.id) {
      let noteId = req.params.id;

      let existingArray = JSON.parse(fs.readFileSync(noteJson).toString());
      const findNote = existingArray.find((c) => c.id === noteId);

      const note = {
        id: findNote.id,
        title: findNote.title,
        content: findNote.content,
        user_id: findNote.user_id,
        dateCreated: new Date(findNote.dateCreated),
      };

      return res.status(200).json({
        status: 200,
        message: null,
        data: note,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Note not found",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error.message,
    });
  }
};

module.exports.updateNoteById = async (req, res) => {
  try {
    if (!req.body.title && !req.body.content) {
      return res.status(400).json({
        status: 400,
        message: "title, content are required fields",
        data: null,
      });
    }
    let noteId = req.params.id;
    console.log(noteId);

    let existingArray = JSON.parse(fs.readFileSync(noteJson).toString());
    const findNote = existingArray.find((c) => c.id === noteId);

    console.log(findNote);

    findNote.title = req.body.title;
    findNote.content = req.body.content;
    findNote.updatedDate = Date.now();

    console.log(existingArray);

    if (findNote) {
      console.log(existingArray);
      if (existingArray) {
        const arrayTosave = [];
        // arrayTosave.pus
        // arrayTosave.push(note);
        // existingArray = [...existingArray, ...arrayTosave];
        // console.log(existingArray);

        try {
          fs.writeFileSync(noteJson, JSON.stringify(existingArray));
          return res.status(200).json({
            status: 200,
            message: "Note saved successfully",
            data: findNote,
          });
        } catch (error) {
          console.log(error);
          return res.status(400).json({
            status: 400,
            message: "Error occurred",
            data: error.message,
          });
        }
      }
    } else {
      return res.status(404).json({
        status: 404,
        message: "Note not found",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error.message,
    });
  }
};

module.exports.deleteNoteById = async (req, res) => {
  try {
    let noteId = req.params.id;
    let existingArray = JSON.parse(fs.readFileSync(noteJson).toString());
    
    if (existingArray) {
      
        // const deleteNote = existingArray.filter(c=>c.id === noteId);
        const findNote = existingArray.findIndex((c) => c.id === noteId);
        existingArray.splice(findNote, 1);

        console.log(existingArray);
      try {
        fs.writeFileSync(noteJson, JSON.stringify(existingArray));
        return res.status(200).json({
          status: 200,
          message: "Note saved successfully",
          data: findNote,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          status: 400,
          message: "Error occurred",
          data: error,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error,
    });
  }
};
