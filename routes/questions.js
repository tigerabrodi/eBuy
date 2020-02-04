const express = require("express");
const auth = require("../middleware/auth");
const {check} = require("express-validator");
const questionsController = require("../controllers/questions");
const router = express.Router();

router.post("/:productId", [
    auth,
    [
        check("text").notEmpty()
    ]
], questionsController.askQuestion);

router.get("/:productId", auth, questionsController.getQuestions);

router.put("/:questionId", [
    auth,
    [
        check("text", "You can not have your question being empty").notEmpty()
    ]
], questionsController.updateQuestion);

router.delete("/:questionId", auth, questionsController.deleteQuestion);

module.exports = router;

