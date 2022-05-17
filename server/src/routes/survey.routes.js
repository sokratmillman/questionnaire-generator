const { defaultConfiguration } = require("express/lib/application");
const multer = require("multer");
const path = require("path");

module.exports = (app, pool) => {
  app.use(multer().any());
  const survey = require("../controllers/survey.controller.js");
  let router = require("express").Router();
  router.post("/create", survey.create);
  router.get("/author", survey.getForAuthor);
  router.get("/:id", survey.getById);
  router.post("/:id", survey.postById);
  app.use("/api/surveys", router);
};
