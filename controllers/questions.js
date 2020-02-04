const {validationResult} = require("express-validator");
const User = require("../models/User");
const Product = require("../models/Product");
const Question = require("../models/Question");


// @route    POST /questions/:productId
// @desc     Ask Question
// @access   Private
exports.askQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({msg: "Product not found"})
        }
        let question = new Question({
            text: req.body.text,
            product: req.params.productId,
            user: req.user.id,
        });
        question = await question.save();
        res.status(201).json(question);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}


// @route    GET /questions/:productId
// @desc     Get Questions that belong to product with the ID of productId
// @access   Private
exports.getQuestions = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({msg: "Product do not exists"});
        }
        const questions = await Question.find({product: product._id}).sort({date: -1}).populate("user").select("-password");
        res.status(200).json(questions);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}


// @route    DELETE /questions/:questionId
// @desc     Delete Question
// @access   Private
exports.deleteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.questionId);
        if(!question) {
            return res.status(404).json({msg: "Question do not exist"})
        }
        if (question.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "You have no permission to delete this question"})
        }
        await question.remove();
        res.status(200).json({msg: "Question Removed"});
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}

// @route    PUT /questions/:questionId
// @desc     Update a question
// @access   Private
exports.updateQuestion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let question = await Question.findById(req.params.questionId);

        if (!question) {
            return res.status(404).json({msg: "Question not found"});
        }

        if (question.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "You have no permission to delete this question"});
        }

        question = await Question.findByIdAndUpdate(req.params.questionId, req.body);
        await question.save();
        res.status(200).json(question);
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
        next(err);
    }
}