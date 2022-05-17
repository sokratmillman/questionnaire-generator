module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
