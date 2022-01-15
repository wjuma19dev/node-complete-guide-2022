const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  cart: {
    items: [
      { 
        productId: { type: mongoose.Types.ObjectId, ref: 'Product', require: true }, 
        quantity: { type: Number, require: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product) {

  const cartProductIndex = _.findIndex(this.cart.items, { productId: product._id });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if(cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }

  const updatedCart = {
    items: updatedCartItems
  }

  this.cart = updatedCart;
  return this.save();

}

const User = mongoose.model('User', userSchema);

module.exports = User;