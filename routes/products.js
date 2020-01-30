const express = require("express");
const auth = require("../middleware/auth");
const {check} = require("express-validator");
const productController = require("../controllers/products");
const router = express.Router();


// Get all products
router.get("/", auth, productController.getAllProducts);

// Get a single user's products
router.get("/:userId", auth, productController.getUserProducts);

// Get a product by its ID
router.get("/product/:productId", auth, productController.getProduct)

router.put("/edit/:productId", [
    auth,
    [
        check("name", "Name is required").notEmpty(),
        check("description", "Description is required").notEmpty(),
        check("price", "Price is required").isNumeric()
    ]
], productController.editProduct);


// Create Product
router.post("/", [
    auth,
    [
        check("name", "Name is required").notEmpty(),
        check("description", "Description is required").notEmpty(),
        check("price", "Price is required").isNumeric()
    ]
], productController.createProduct);

// Delete Product
router.delete("/:productId", auth, productController.deleteProduct);

module.exports = router;