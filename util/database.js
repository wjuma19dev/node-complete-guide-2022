const mongoose = require('mongoose');

module.exports = async (callback) => {

  const url = 'mongodb://localhost/shopify';

  const client = await mongoose.connect(url);

  console.log(client);
  callback();

}
