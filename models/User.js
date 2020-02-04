const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  cart: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {type: Number, required: true}
      }
    ]
  }
},
 {
   toJSON: {virtuals: true}
 });

 UserSchema.virtual("products", {
   ref: "Product",
   localField: "_id",
   foreignField: "user"
 });

 UserSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.product.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      product: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
 }

 UserSchema.methods.removeFromCart = function(cartItemToRemove) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item._id.toString() !== cartItemToRemove._id.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);