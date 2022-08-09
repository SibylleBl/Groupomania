const express = require("express");
const mongoose = require("mongoose");
const app = express();
const env = require("dotenv").config();

mongoose
  .connect(process.env.MONGO_ID, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

module.exports = app;
