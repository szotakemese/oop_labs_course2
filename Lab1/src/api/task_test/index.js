const express = require('express');
const taskTest = require('./task.js');

const taskTestRouter = express.Router();

taskTestRouter.get('/', taskTest.taskTest);

module.exports = taskTestRouter;