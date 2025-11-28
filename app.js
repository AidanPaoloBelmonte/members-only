const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const path = require("node:path");

const { handleAccountStrategy, deserializeUser } = require("./db/queries");
const handleRouting = require("./routers/appRouter");

require("dotenv").config();

const app = express();

// Specify View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Specify Path to external data such as CSS and Images
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Allow parsing of Form Data in the Request Body (req.body)
app.use(express.urlencoded({ extended: true }));

// Initialize Sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.session());
passport.use(new LocalStrategy(handleAccountStrategy));
passport.serializeUser((user, done) => {
  done(null, user.id, user.username);
});
passport.deserializeUser(deserializeUser);

// Specify Routes
app.use("/", handleRouting(passport));

// Start Server
const PORT = process.env.PORT | 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Active on port ${PORT}`);
});
