const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {virtuals: true}
});

QuestionSchema.virtual("answers", {
    ref: "Answer",
    localField: "_id",
    foreignField: "question"
});

module.exports = mongoose.model("Question", QuestionSchema);