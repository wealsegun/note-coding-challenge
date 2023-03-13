const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const authJson = "../config/auth.json";
const shortid = require("shortid");
const path = require("path");
const noteJson = path.resolve(__dirname, "../config/note.json");
const ID = shortid.generate();
// console.log();

module.exports.createNote = async (req, res) => {
  try {
    if (req.body.title && req.body.content && req.body.user_id) {
      const title = req.body.title;
      const content = req.body.content;
      const user_id = req.body.user_id;

      const note = {
        id: ID,
        title: title,
        content: content,
        user_id: user_id,
        dateCreated: Date.now(),
      };

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
            data: null,
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
    } else {
      return res.status(400).json({
        status: 400,
        message: "title, content, and user_id are required fields",
        data: error,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error,
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
      let id = req.param.id;
      let newArray = [];
      let existingArray = JSON.parse(fs.readFileSync(noteJson).toString());

      newArray = existingArray;
      console.log(newArray);

      let findNote = newArray.find((c) => {
        console.log(c);
        c.id === id;
      });
      console.log(findNote);

      return res.status(200).json({
        status: 200,
        message: null,
        data: findNote,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "An error Occured!",
        data: error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error,
    });
  }
};

module.exports.updateNoteById = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error,
    });
  }
};

module.exports.deleteNoteById = async (req, res) => {
  try {
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
          data: null,
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
