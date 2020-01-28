const {validationResult} = require("express-validator");
const User = require("../models/User");
const Product = require("../models/Product");


// @route    POST /products
// @desc     Add Product
// @access   Private
exports.createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(req.body);
      const {name, description, price} = req.body;

      if (!req.file) {
        return res.status(400).json({msg: "Please upload an Image!"})
      }

      const image = "/" + req.file.path.replace("\\" ,"/");

      const newProduct = new Product({
        user: req.user.id,
        name,
        description,
        price,
        image
      });

      const product = await newProduct.save();
      res.status(201).json(product);
      next();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
      next(err);
    }
}

// @route    GET /products
// @desc     Get all products
// @access   Private
exports.getAllProducts = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 6;
    let totalItems;
    const totalProducts = await Product.find().countDocuments();
    totalItems = totalProducts;
    const products = await Product.find().sort({date: -1})
    .populate("user")
    .skip((currentPage - 1) * perPage)
    .limit(perPage);
    res.status(200).json({
      msg: "Fetched products successfully",
      products: products,
      totalItems: totalItems
    });
    next();
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
      next(err);
  }
}


// @route    GET /products/:userId
// @desc     Get a single user's products
// @access   Private
exports.getUserProducts = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({msg: "No User with this ID was found"})
    }

    const products = await Product.find({user: user._id})

    res.status(200).json(products);
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
    next(err);
  }
}