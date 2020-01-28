const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

},
{
    toJSON: {virtuals: true}
})

ProductSchema.virtual("question", {
    ref: "Question",
    localField: "_id",
    foreignField: "product"
});

module.exports = mongoose.model("Product", ProductSchema);