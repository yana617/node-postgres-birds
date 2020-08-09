const { Client } = require('pg');
const chalk = require('chalk');

const client = new Client();
client.connect(err => {
  if (err) {
    console.log(chalk.red.bold('[ERROR] Database connection error'));
    console.error(err.stack);
    process.exit(1);
  } else {
    console.log(chalk.green.bold('[INFO DB] Connected to database'));
    client.end();
  }
});