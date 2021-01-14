const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//.. user khadija -- pass KHHZFRQnePWCAIz2

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const env = require("../nodemon.json")

const app = express();

mongoose.connect(
  "mongodb+srv://khadija:" + process.env.MONGO_ATLAS_PW + "@cluster0.m7qfi.mongodb.net/node-angular"
  )
  .then(()=>{
    console.log("Connected to DB Successfully")
  })
  .catch(()=>{
    console.log("Connection failed")
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));// fetch images file

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
