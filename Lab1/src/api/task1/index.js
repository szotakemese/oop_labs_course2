const express = require('express');
const task1 = require('./task.js');

const task1Router = express.Router();

task1Router.get('/', task1.seventhOfTask1);

module.exports = task1Router;