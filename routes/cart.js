const express = require("express");
const auth = require("../middleware/auth");
const {check} = require("express-validator");
const cartController = require("../controllers/cart");
const router = express.Router();

router.post("/:productId", auth, cartController.addProductToCart);

router.delete("/cart-delete/:cartItemId", auth, cartController.deleteCartItem);

router.post("/payment", auth, cartController.stripePayment);

router.get("/", auth, cartController.getCart);

module.exports = router;