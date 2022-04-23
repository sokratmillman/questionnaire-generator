const loginRoutes = require("./login.routes");
const surveyRoutes = require("./survey.routes");

module.exports = function (app, pool) {
  loginRoutes(app, pool);
  surveyRoutes(app, pool);
  // Тут, позже, будут и другие обработчики маршрутов
};
