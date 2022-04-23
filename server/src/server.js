const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = require('./models');
db.sequelize.sync();

require('./routes')(app);

app.listen(port, () => {
  console.log(`We are live on ${port}`)
});
