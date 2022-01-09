const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const Productos = path.join(__dirname, '../data/productos.json');

class Product {

  constructor(t, p, iu, d) {
    this.id = 1,
    this.title = t;
    this.price = p;
    this.imageUrl = iu;
    this.description = d;
  }

  save() {
    return new Promise((resolve, reject) => {
      try {   
        const productos = readFileSync(Productos, 'utf8');
        const productosParse = JSON.parse(productos);
        const ultimoProducto = productosParse[productosParse.length - 1];
        this.id = ultimoProducto.id + 1;
        productosParse.push(this);
        try {
          writeFileSync(Productos, JSON.stringify(productosParse, null, 2));
          resolve(this);
        } catch (error) {
          reject('No se pudo guardar el producto');
        }
      } catch (error) {
        if (error.errno === -4058) {
          writeFileSync(Productos, JSON.stringify([this], null, 2));
        }
      }
    });
  }

  static async find() {
    try {
      const products = readFileSync(Productos, 'utf8');
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

}

module.exports = Product;