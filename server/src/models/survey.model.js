module.exports = (sequelize, Sequelize) => {
  const Survey = sequelize.define("survey", {
    title: {
      type: Sequelize.STRING,
    },
    questionDescription: {
      type: Sequelize.STRING,
    },
    filepath: {
      type: Sequelize.STRING,
    },
    resultFilepath: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.INTEGER,
    },
    filtering: {
      type: Sequelize.BOOLEAN,
    },
    filteringQuestion: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    windowWidth: {
      type: Sequelize.INTEGER,
    },
    windowHeight: {
      type: Sequelize.INTEGER,
    },
  });

  return Survey;
};
