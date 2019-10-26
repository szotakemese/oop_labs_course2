const express = require("express");

const aboutRouter = require("./about");
const randomRouter = require("./random");
const taskTestRouter = require("./task_test");
const task1Router = require("./task1");
const task2Router = require("./task2");

const apiRouter = express.Router();
apiRouter.use('/about', aboutRouter);
apiRouter.use('/random', randomRouter);
apiRouter.use('/task_test', taskTestRouter);
apiRouter.use('/task1', task1Router);
apiRouter.use('/task2', task2Router);

module.exports = apiRouter;