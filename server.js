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
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "the,fiend",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.post("/signIn", (req, res) => {signIn.handleSignIn(req, res, knex, bcrypt)});

app.post("/register", (req, res) => {register.handleRegister(req, res, knex, bcrypt)});

app.get("/profile/:id", (req, res) => {profile.handleProfileGet(req, res, knex)});

app.put("/image", (req, res) => {image.handleImage(req, res, knex)});

app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)});

app.listen(3000, () => {
  console.log("app is runnig on port 3000");
});
