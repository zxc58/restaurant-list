const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const resetaurants = require("./modules/restaurants");


router.use("/",home);
router.use("/restaurants",resetaurants);

module.exports = router ;



