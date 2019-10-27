const express = require("express");
const abonent = require("./abonent");
const router = new express.Router();


router.use("/abonent", abonent.apiRouter);

module.exports = {
	router
}
