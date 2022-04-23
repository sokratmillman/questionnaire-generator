const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  //console.log(req.body);

  if (!req.body.login || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });

    return;
  }

  const user = {
    login: req.body.login,
    password: req.body.password,
  };

  const condition = { login: { [Op.iLike]: `%${user.login}%` } };
  User.findOne({ where: condition }).then((data) => {
    if (data) {
      res.status(400).send({
        message: "Such login already taken",
      });

      return;
    }

    User.create(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {};

exports.login = (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  const condition = { login: { [Op.iLike]: `%${login}%` } };

  User.findOne({ where: condition })
    .then((data) => {
      if (data) {
        if (data.login === login && data.password === password) {
          res.send("ok");
        } else {
          res.status(401).send({
            message: "Wrong login/password",
          });
        }
      } else {
        res.status(404).send({
          message: `Cannot find User with login=${login}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User",
      });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};
