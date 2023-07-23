const express = require("express");
const router = express.Router();
const {register,profile,updateUserData,changePassword,showUsers,deleteUser, showUser} = require('../controller/userController')
const auth = require("../middleware/auth-Middleware");
const isAdmin = require("../middleware/isAdmin-Middleware");

// router.use(auth)

router.post("/register",register) 
router.get("/showusers",showUsers) 
router.get("/profile",auth,profile) 
router.get("/:id",showUser) 
router.put("/:id",updateUserData) 
router.put("/changePassword/:id",changePassword)
router.delete("/:id",deleteUser)




module.exports = router

