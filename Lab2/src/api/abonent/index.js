const express = require("express");
const controller = require("./controller.js");
const task2ApiRouter = new express.Router();

task2ApiRouter.get("/", controller.task2Controller.get);
task2ApiRouter.get("/filtered", controller.task2Controller.getFiltered);
task2ApiRouter.get("/:id", controller.task2Controller.getId);
task2ApiRouter.post("/", controller.task2Controller.post);
task2ApiRouter.delete("/:id", controller.task2Controller.deleteId);


module.exports = {
	apiRouter:task2ApiRouter
}
