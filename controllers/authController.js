const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const validations = require("../utils/validation");
const path = require("path");
const authJson = path.resolve(__dirname, "../config/auth.json");

module.exports.createUser = async (req, res) => {
  try {
    const password = req.body.password;
    const emailID = req.body.email;

    if (!validations.isString(password)) {
      return res.status(422).json({
        status: 422,
        message: "Password parameter must be a valid String.",
        isError: true,
        isSuccessful: false,
        data: null,
      });
    }

    const valid =
      (req.body.firstName && validations.isString(req.body.firstName)) ||
      (validations.isString(req.body.lastName) && req.body.lastName) ||
      (validations.isString(req.body.phoneNumber) && req.body.phoneNumber) ||
      validations.isString(req.body.email && req.body.email && validateEmail(req.body.email)) ||
      (validations.isString(req.body.password) && req.body.password);

    if (!valid) {
      res.status(422).json({
        status: 422,
        message: `
            firstName(String), 
            lastName(String),
            phoneNumber(String), 
            email(String),
            password(String),
                are required fields`,
        data: null,
      });
    }

    const hashPassword = bcrypt.hashSync(password);

    let existingArray = JSON.parse(fs.readFileSync(noteJson).toString());

    const user = {
      id: await generateUID(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: hashPassword,
    };

    console.log(user);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error,
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error,
    });
  }
};

const generateUID = async () => {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};
const validateEmail = async (email) => {
    return await String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
