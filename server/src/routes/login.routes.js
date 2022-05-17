module.exports = (app, pool) => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.post("/create", users.create);
  router.post("/login", users.login);
  app.use("/api/users", router);
};
