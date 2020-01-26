const express = require("express");
const auth = require("../middleware/auth");
const {check} = require("express-validator");
const authController = require("../controllers/auth");
const router = express.Router();


// Sign Up
router.post("/signup", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min: 6})
],
authController.signup
);

// Sign In
router.post("/signin", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
],
authController.signin
);


// Get User
router.get("/", auth, authController.getUser);



module.exports = router;

