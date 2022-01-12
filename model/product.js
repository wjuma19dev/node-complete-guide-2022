const path = require('path'),
      rootDir = require('../util/path'),
      _ = require('lodash'),
      fs = require('fs'),
      p = path.join(rootDir, 'data', 'productos.json');

const Cart = require('../model/cart');

class Product {

  constructor(i, t, p, iu, d) {
    this.id = i,
    this.title = t;
    this.price = p;
    this.imageUrl = iu;
    this.description = d;
  }

  save() {
    if(!this.id) {
      fs.readFile(p, 'utf-8', (error, fileContent) => {
        if(error) {
          console.log(error);
          return;
        }
        const products = JSON.parse(fileContent);
        const ultimoId = products[products.length - 1].id;
        this.id = ultimoId+1;
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), error => {
          console.log(error);
        });
      });
    } else {
      fs.readFile(p, 'utf-8', (error, fileContent) => {
        if(error) {
          console.log(error);
          return;
        }
        const productId = parseInt(this.id);
        const products = JSON.parse(fileContent);
        const productIndex = _.findIndex(products, { id: productId });
        this.id = productId;
        products[productIndex] = this;
        fs.writeFile(p, JSON.stringify(products), error => {
          console.log(error);
        });
      });
    }
  }

  static find(callback) {
    getProductFromFile(productsParse => {
      callback(productsParse);
    });
  }

  static findById(productId, callback) {
    getProductFromFile(products => {
      const product = _.find(products, { id: parseInt(productId) });
      callback(product);     
    });
  }

  static deleteById(productId, callback) {
    getProductFromFile(products => {
      const product = _.find(products, { id: parseInt(productId) });
      const updatedProducts = _.filter(products, p => p.id !== parseInt(productId));
      fs.writeFile(p, JSON.stringify(updatedProducts, null, 2), error => {
        if(!error) {
          Cart.deleteProduct(productId, product.price);
          callback();
        }
      })
    });
  }
  
}

function getProductFromFile(callback) {
  fs.readFile(p, 'utf-8', (error, fileContent) => {
    if(error) {
      callback([]);
      return;
    }
    callback(JSON.parse(fileContent));
  });
}


module.exports = Product;