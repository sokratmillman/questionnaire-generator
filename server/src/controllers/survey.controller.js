const db = require("../models");
const multer = require("multer");
const path = require("path");
const Survey = db.surveys;
const Op = db.Sequelize.Op;

exports.create = (req, res, next) => {
  // console.log(req.body);
  //console.log(req.file);
  // console.log(req.query);
  if (!req.body.title || !req.body.filtering || !req.file) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const pathToFile = path.join(
    path.dirname(__dirname),
    "survey_csvs",
    req.file.filename
  );
  const survey = {
    title: req.body.title,
    filename: pathToFile,
    author: Number(req.query.id),
    filtering: req.body.filtering === "true" ? true : false,
    filtering_question: req.body.filtering_question,
    window_width: Number(req.body.width),
    window_height: Number(req.body.height),
  };
  console.log(survey);
  Survey.create(survey)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the survey.",
      });
    });
};

exports.getone = (req, res) => {};
