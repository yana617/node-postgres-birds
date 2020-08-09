const express = require('express');
const chalk = require('chalk');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();

require('./database');

app.use(bodyParser.json())

app.use(require('./routes'));

app.get('/version', (req, res) => {
  res.send('Birds Service. Version 0.1');
});

app.listen(8080, (err) => {
  if(!err) {
    console.log(chalk.green.bold('[INFO] Server started on port 8080!'));
  }
});

module.exports = app;
