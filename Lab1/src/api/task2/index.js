const express = require('express');
const task2 = require('./task.js');

const task2Router = express.Router();

task2Router.get('/', task2.abonent);

module.exports = task2Router;