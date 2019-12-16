const express = require("express");
const controller = require("./controller.js");
const accountApiRouter = new express.Router();

accountApiRouter.get("/", controller.accountController.get);
accountApiRouter.get("/:id", controller.accountController.getId);
accountApiRouter.put("/login", controller.accountController.logIn);
accountApiRouter.put("/logout", controller.accountController.logOut);
accountApiRouter.post("/", controller.accountController.post);
accountApiRouter.delete("/:id", controller.accountController.deleteId);


module.exports = {
	apiRouter:accountApiRouter
}
