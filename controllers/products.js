const {validationResult} = require("express-validator");
const User = require("../models/User");
const Product = require("../models/Product");
const Question = require("../models/Question");


// @route    POST /products
// @desc     Add Product
// @access   Private
exports.createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
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
    .populate("user").select("-password")
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
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({msg: "No User with this ID was found"})
    }
    const currentPage = req.query.page || 1;
    const perPage = 6;
    let totalItems;
    const totalProducts = await Product.find({user: user._id}).countDocuments();
    totalItems = totalProducts;
    const products = await Product.find({user: user._id}).sort({date: -1})
    .populate("user").select("-password")
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

// @route    GET /products/product/:productId
// @desc     Get a single product by its ID
// @access   Private
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).populate("user").select("-password");
    if (!product) {
      return res.status(404).json({msg: "Could not find product"});
    }

    res.status(200).json(product);
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
    next(err);
  }
}


// @route    PUT /products/edit/:productId
// @desc     Delete a product
// @access   Private
exports.editProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({msg: "Product do not exist!"})
    }

    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({msg: "User is not authorized"});
    }

    if (!req.file) {
      return res.status(400).json({msg: "Please upload an Image!"})
    }

    const {name, description, price} = req.body;

    const image = "/" + req.file.path.replace("\\" ,"/");

    let updatedProduct = {};
    updatedProduct.name = name;
    updatedProduct.description = description;
    updatedProduct.price = price;
    updatedProduct.image = image;

    product = await Product.findByIdAndUpdate(req.params.productId, updatedProduct);
    await product.save();
    return res.status(200).json(product);
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
    next(err);
  }
}


// @route    DELETE /products/:productId
// @desc     Delete a product
// @access   Private
exports.deleteProduct = async (req, res, next) => {
  try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({msg: "Product do not exist"});
      }
      if (product.user.toString() !== req.user.id) {
        return res.status(401).json({msg: "You are not authorized"});
      }
      await Question.deleteMany({product: product._id});

      

      await product.remove();
      res.status(200).json({msg: "Product Deleted"});
      next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
    next(err);
  }
}