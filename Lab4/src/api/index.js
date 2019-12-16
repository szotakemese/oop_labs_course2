const express = require("express");
const account = require("./account");
const router = new express.Router();


router.use("/authorization", account.apiRouter);

module.exports = {
	router
}
