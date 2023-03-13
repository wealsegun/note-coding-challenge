const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const validations = require("../utils/validation");
const path = require("path");
const authJson = path.resolve(__dirname, "../config/auth.json");
require('dotenv').config();

module.exports.createUser = async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;

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
      validations.isString(
        req.body.email && req.body.email && validateEmail(req.body.email)
      ) ||
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

    let existingArray = JSON.parse(fs.readFileSync(authJson).toString());

    const user = {
      id: await generateUID(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: email,
      password: hashPassword,
      dateCreated: Date.now(),
    };
    // console.log(existingArray);

    const userExist = existingArray.find((c) => c.email === user.email);

    console.log(userExist);
    if (userExist) {
      //   console.log(userExist);
      return res.status(400).json({
        status: 400,
        message: "User already exist",
        data: null,
      });
    } else {
      console.log(user);

      console.log(existingArray);
      if (existingArray) {
        const arrayTosave = [];
        // arrayTosave.pus
        arrayTosave.push(user);
        existingArray = [...existingArray, ...arrayTosave];
        console.log(existingArray);

        try {
          fs.writeFileSync(authJson, JSON.stringify(existingArray));
          return res.status(200).json({
            status: 200,
            message: "User created successfully",
            data: user,
          });
        } catch (error) {
          console.log(error);
          return res.status(400).json({
            status: 400,
            message: "Error occurred",
            data: null,
          });
        }
      }

      console.log(user);
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "An error Occured!",
      data: error.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const valid =
      (password && validations.isString(password)) ||
      (email && validations.isString(email) && validateEmail(email));

    if (!valid) {
    }

    const hashPassword = bcrypt.hashSync(password);

    let existingArray = JSON.parse(fs.readFileSync(authJson).toString());
    // console.log(existingArray);

    const userExist = existingArray.find((c) => c.email === email);
    if (userExist) {
      var passwordIsValid = bcrypt.compareSync(password, userExist.password);
      if (passwordIsValid) {
        const secret = process.env.SECRET;
        console.log(process.env.PORT);
        const token = jwt.sign(
          {
            id: userExist.id,
            email: userExist.email,
            firstName: userExist.firstName,
            lastName: userExist.lastName
          },
          secret,
          {
            expiresIn: 86400, // expire in 24 hours
          }
        );

        const _token = {
          token: token,
        //   refreshToken: token,
          expiresIn: "24 hours",
        };

        const user = {
          userExist: userExist.id,
          email: userExist.email,
          phoneNumber: userExist.phoneNumber,
          firstName: userExist.firstName,
          lastName: userExist.lastName,
          dateCreated: new Date(userExist.dateCreated),
        };

        const authDetails = {
          token: _token,
          user: user,
        };

        res.status(200).json({
          status: 200,
          message: "User loged in successfully",
          data: authDetails,
        });
      } else {
        const auth = {
          auth: false,
          token: null,
          message: "Invalid password entered!!",
        };
        return res.status(401).json({
          status: 401,
          message: "User not found",
          isError: true,
          isSuccessful: false,
          data: auth,
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: "User not found",
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
