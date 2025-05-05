const { Router } = require("express");
const { registerUser, login, updateProfile, logout, getUserProfile, myProfile, findUser, getAllUser } = require("../controller/userController");
const { isAuthenicatedUser, authorizeRoles } = require("../utils/middleware");
const { createServices, updateServices, getAllUserServices, getUserServices, getparticularserviceforcustomer, getAllServicesByLocation, getParticularserviceaccordingtolocation, bookservices, getAllServices, getLoggedinUserServices, VeirfyPayment } = require("../controller/serviceController");

const router=Router()
router.route("/register").post(registerUser)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenicatedUser,myProfile)
router.route('/loggedinuserservice').get(isAuthenicatedUser,getLoggedinUserServices)
router.route("/getallusers").get(isAuthenicatedUser ,authorizeRoles('admin'),getAllUser)
router.route("/updateProfile").put( isAuthenicatedUser,updateProfile)
router.route("/createservice").post( isAuthenicatedUser,createServices)
router.route("/updateservice").put( isAuthenicatedUser,updateServices)
router.route("/getAlluserservices").get(isAuthenicatedUser,getAllUserServices)
router.route("/getuserservices").get(isAuthenicatedUser,getUserServices)
router.route("/getparticularserviceforcustomer").post(isAuthenicatedUser,getparticularserviceforcustomer)
router.route("/getAllServicesByLocation").get(isAuthenicatedUser,getAllServicesByLocation)
router.route("/getAllServices").get(isAuthenicatedUser,getAllServices)
router.route("/user/:id").get(isAuthenicatedUser,findUser)
router.route("/getParticularserviceaccordingtolocation").post(isAuthenicatedUser,getParticularserviceaccordingtolocation)

router.route("/bookservice").post(isAuthenicatedUser,bookservices)
router.route('/verifyservice').post(isAuthenicatedUser,VeirfyPayment)
module.exports=router

// router.post("/login",loginFunction)

