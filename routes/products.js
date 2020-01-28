const express = require("express");
const auth = require("../middleware/auth");
const {check} = require("express-validator");
const productController = require("../controllers/products");
const router = express.Router();


// Create Product
router.post("/", [
    auth,
    [
        check("name", "Name is required").notEmpty(),
        check("description", "Description is required").notEmpty(),
        check("price", "Price is required").isNumeric()
    ]
], productController.createProduct);

module.exports = router;