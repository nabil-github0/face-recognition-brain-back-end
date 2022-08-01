const express = require("express");
const bcrypt = require("bcrypt-node");
const cors = require("cors");
const { response } = require("express");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {res.send("It is working!")});

app.post("/signIn", (req, res) => {signIn.handleSignIn(req, res, knex, bcrypt)});

app.post("/register", (req, res) => {register.handleRegister(req, res, knex, bcrypt)});

app.get("/profile/:id", (req, res) => {profile.handleProfileGet(req, res, knex)});

app.put("/image", (req, res) => {image.handleImage(req, res, knex)});

app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is runnig on port ${process.env.PORT}`);
});
