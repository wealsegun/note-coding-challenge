const express = require("express"),
  cors = require("cors"),
  helmet = require("helmet"),
  bodyParser = require("body-parser");
const logger = require("morgan");
const auth = require('./routes/auth.route');
const note = require('./routes/note.route');

const errorLog = require("./utils/errorLogger");
app = express();

app.use(logger(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(helmet());
app.use(bodyParser.json());

app.use(errorLog);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// 500 internal server error handler
app.use((err, req, res, next) => {
  if (err.statusCode === 404) return next();
  res.status(500).json({
    err: process.env.NODE_ENV === "production" ? null : err,
    msg: "500 internal server error",
    data: null,
  });
});

// handle routes
app.use('/api', note);
app.use('/api', auth);


// 404 error handler
app.use((req, res) => {
    // console.log("am here error 404")
    console.log()
  res.status(404).json({
    err: null,
    msg: "404 Not found",
    data: null,
  });
});





module.exports = app;

