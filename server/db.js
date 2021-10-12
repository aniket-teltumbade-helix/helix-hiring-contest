const chalk = require("chalk");
const mongoose = require('mongoose')

const url = process.env.MONGO_URL || "mongodb://localhost:27017/codebase"
const connected = chalk.bold.green;
const error = chalk.bold.redBright;
const disconnected = chalk.bold.gray;
const termination = chalk.bold.magenta;


module.exports = function () {

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

  mongoose.connection.on('connected', function () {
    console.log("Mongodb: " + connected('Connected'));
  });

  mongoose.connection.on('error', function (err) {
    console.log("Mongodb: " + error(err) + " error");
  });

  mongoose.connection.on('disconnected', function () {
    console.log(disconnected("Mongodb: disconnected"));
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(termination("Mongodb: Abort"));
      process.exit(0)
    });
  });
}