const {validationResult} = require("express-validator");
const User = require("../models/User");
const Product = require("../models/Product");
const auth = require("../middleware/auth");


// @route    POST /products/
// @desc     Add Product
// @access   Private
exports.createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {title, description, price} = req.body;

      if (!req.file) {
        return res.status(400).json({msg: "Please upload an Image!"})
      }

      const image = "/" + req.file.path.replace("\\" ,"/");

      const newProduct = new Product({
        user: req.user.id,
        title,
        description,
        price,
        image
      });

      const product = await newProduct.save();
      res.status(201).json(product);
      console.log(product);
      next();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
      next(err);
    }
}