module.exports = (sequelize, Sequelize) => {
  const Survey = sequelize.define("survey", {
    title: {
      type: Sequelize.STRING,
    },
    filename: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.INTEGER,
    },
    filtering: {
      type: Sequelize.BOOLEAN,
    },
    filtering_question: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    window_width: {
      type: Sequelize.INTEGER,
    },
    window_height: {
      type: Sequelize.INTEGER,
    },
  });

  return Survey;
};
