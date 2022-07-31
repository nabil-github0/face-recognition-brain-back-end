const clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "324412e7be3c45a982ecb3f14998f563",
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json("Unable to work with api"))
}

const handleImage =  (req, res, knex) => {
    const { id } = req.body;
    knex("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0].entries);
      })
      .catch((err) => res.status(400).json("Unable to get entries"));
  }

  module.exports = {handleImage, handleApiCall};