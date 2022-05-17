const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body.login || !req.body.password) {
    res.status(400).send({
      status: "error",
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
        status: "error",
        message: "Such login already taken",
      });

      return;
    }

    User.create(user)
      .then((data) => {
        res.status(200).json({ id: data.id });
      })
      .catch((err) => {
        res.status(500).send({
          status: "error",
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

  console.log(req.body);
  console.log("login: ", login);
  console.log("pasword: ", password);

  const condition = { login: { [Op.iLike]: `%${login}%` } };

  User.findOne({ where: condition })
    .then((data) => {
      if (data) {
        if (data.login === login && data.password === password) {
          // res.status(200).set({
          //     "Content-Type": "application/json",
          //     "Access-Control-Allow-Origin": "*",
          // });
          // res.send({
          //     status: 'ok',
          // });
          res.send({ id: data.id });
        } else {
          res
            .set({
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            })
            .status(401)
            .send({
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
