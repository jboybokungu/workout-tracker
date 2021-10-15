require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/exercise', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"))
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"))
});

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});