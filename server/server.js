const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const cors = require("cors");
dotenv.config();
const app = express();

//app.use(morgan('combined'))
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected DB!");
    }
  }
);
const wordRoutes = require("./routes/word");

app.use("/api", wordRoutes);

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("listenin on port", 5000);
  }
});
