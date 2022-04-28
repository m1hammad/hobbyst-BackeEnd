// Dependencies
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const flash = require('connect-flash')
const favicon = require('serve-favicon');
const path = require('path');


// const bodyParser = require('body-parser')
// const fs = require('fs')
// const path = require('path')

// const multer = require('multer')

// Port Configuration
const PORT = process.env.PORT;

// Initialize Express Application
const app = express();
app.use(express.json())

// look for static files here (CSS, JS, Images, Video, Audio)
app.use(express.static("public"));

const expressLayouts = require("express-ejs-layouts");

// Look into views folder for a file named as layout.ejs
app.use(expressLayouts);

let session = require('express-session');
let passport = require('./helper/ppConfig');

app.use(session({
  secret: process.env.secret,
  saveUninitialized: true,
  resave: false,
  cookie: {maxAge: 360000}
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash()) 






// Sharing the information with all pages.
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next()
})

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Import Routes
const authRoutes = require("./routes/auth");
const hobbyRoutes = require("./routes/hobby")
const eventRoutes = require("./routes/event")
const profileRoutes = require("./routes/profile")

// Mount Routes
app.use('/', authRoutes);

app.use('/', hobbyRoutes);
app.use('/', eventRoutes);
app.use('/', profileRoutes)


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// NodeJS to look in a folder called views for all ejs files.
// app.set("view engine", "ejs");

// Connection with mongoDB
mongoose.connect(process.env.mongoDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
() => {
    console.log("mongodb connected successfully!");
});

app.listen(PORT, () => console.log(`App is running on ${PORT}`));


// app.get("/a", (req, res) => {
//     res.render("home/another");
// });