const { defaultConfiguration } = require("express/lib/application");
const path = require("path");

module.exports = (app, pool) => {
  const survey = require("../controllers/survey.controller.js");
  let router = require("express").Router();
  let multer = require("multer");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/survey_csvs");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  let upload = multer({ storage: storage });

  router.post("/create", upload.single("csv_file"), survey.create);
  // Retrieve all Tutorials
  // router.get('/', tutorials.findAll);
  // // Retrieve all published Tutorials
  // router.get('/published', tutorials.findAllPublished);
  // // Retrieve a single Tutorial with id
  //router.post('/login', users.login);
  // // Update a Tutorial with id
  // router.put('/:id/forms', users.getForms);
  // // Delete a Tutorial with id
  // router.delete('/:id', tutorials.delete);
  // // Create a new Tutorial
  // router.delete('/', tutorials.deleteAll);
  app.use("/api/surveys", router);
};
