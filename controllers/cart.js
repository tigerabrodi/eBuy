const Product = require("../models/Product");
const User = require("../models/User");
const config = require("config");

const stripe = require("stripe")(config.get("StripeApiKey"))

// @route    POST /cart/:productId
// @desc     Add an item to cart
// @access   Private
exports.addProductToCart = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({msg: "Product was not found"});
        }
        if (product.user.toString() === req.user.id) {
            return res.status(404).json({msg: "You have no permission to add this to your cart!"})
        }
        let user = await User.findById(req.user.id).select("-password");
        await user.addToCart(product);
        res.status(200).json(product);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}


// @route    GET /cart
// @desc     Get items in cart
// @access   Private
exports.getCart = async (req, res, next) => {
    try {
       const user = await User.findById(req.user.id).select("-password").populate("cart.items.product");
       if(!user) {
           return res.status(401).json({msg: "You can not get any products since you are not logged in"});
       }
       const products = user.cart.items;
       const totalQuantity = user.cart.items.reduce((accumalatedQuantity, cartItem)=> accumalatedQuantity + cartItem.quantity,
       0
       );
       const totalPrice = user.cart.items.reduce((accumalatedQuantity, cartItem) =>
       accumalatedQuantity + cartItem.quantity * cartItem.product.price,
       0 
       );
       res.status(200).json({products, totalQuantity, totalPrice});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}


// @route    DELETE /cart/cart-delete/cartItemId
// @desc     Delete Items in Cart
// @access   Private
exports.deleteCartItem = async (req, res, next) => {
    try {
        let user = await User.findById(req.user.id).select("-password").populate("cart.items.product");
        if (!user) {
            return res.status(401).json({msg: "You are not authorized"});
        }
        const items = user.cart.items;
        const item = items.find(item => item._id.toString() === req.params.cartItemId);
        await user.removeFromCart(item);
        res.status(200).json({msg: "Successfully removed Item"});
        console.log(user.cart.items)
        next()
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}



// @route    POST /cart/payment
// @desc     Checkout, pay and order your items!
// @access   Private
exports.stripePayment = async (req, res, next) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "usd"
    };

    const payment = await stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({error: stripeErr});
            next();
        } else {
            res.status(200).send({success: stripeRes});
            next();
        }
    });
}