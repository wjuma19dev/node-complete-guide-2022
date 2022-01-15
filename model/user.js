const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  cart: [{ 
    productId: { type: mongoose.Types.ObjectId, require: true }, 
    quantity: { type: Number, require: true }
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;