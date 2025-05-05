const express = require("express");


const { isAuthenicatedUser } = require("../utils/middleware");


const { bookproduct } = require("../controller/ordercontroller");

const router = express.Router();

 

router.route("/bookproduct").post(isAuthenicatedUser,bookproduct)

module.exports = router;