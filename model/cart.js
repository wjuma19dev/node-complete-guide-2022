const rootDir = require('../util/path');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const p = path.join(rootDir, 'data', 'cart.json');

class Cart {

  static addProduct(productId, productPrice, callback) {
    // fetch the previous cart
    fs.readFile(p, 'utf8', (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if(!error) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = _.findIndex(cart.products, { id: productId });
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product | Increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [ ...cart.products ];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: productId, qty: 1 };
        cart.products = [ ...cart.products, updatedProduct ]
      }
      cart.totalPrice = cart.totalPrice + parseFloat(productPrice);
      fs.writeFile(p, JSON.stringify(cart), error => {
        if(error) {
          console.log(error);
        }
        callback();
      })
    });
  }

  static deleteProduct(productId, productPrice, callback) {
    fs.readFile(p, 'utf-8', (error, fileContent) => {

      if(error) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };
      const product = _.find(updatedCart.products, { id: String(productId) });

      const productQty = product.qty;

      updatedCart.products = _.filter(updatedCart.products, p => p.id !== product.id );
      updatedCart.totalPrice = updatedCart.totalPrice - parseFloat(productPrice) * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), error => {
        if(error) {
          console.log(error);
        }
        callback();
      })

    });
  }

  static getCart(callback) {
    fs.readFile(p, 'utf-8', (error, fileContent) => {
      const cart = JSON.parse(fileContent);
      if(error) {
        callback(null);
      } else {
        callback(cart);
      }
    });
  }

}

module.exports = Cart;