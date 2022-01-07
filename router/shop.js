const express = require('express');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

const router = express.Router();
const Productos = path.join(__dirname, '../data/productos.json')

router.get('/', (req, res, next) => {
  const productos = readFileSync(Productos, 'utf8');
  res.json(JSON.parse(productos));
});

router.post('/add-product', (req, res, next) => {

  const { title, price } = req.body;
  const producto = { id: 1, title, price }

  try {   
    const productos = readFileSync(Productos, 'utf8');
    const productosParse = JSON.parse(productos);
    const ultimoProducto = productosParse[productosParse.length - 1];
    producto.id = ultimoProducto.id + 1;
    productosParse.push(producto);
    writeFileSync(Productos, JSON.stringify(productosParse, null, 2));
  } catch (error) {
    if (error.errno === -4058) {
      writeFileSync(Productos, JSON.stringify([producto], null, 2));
    }
  }

  res.redirect('/');
});

module.exports = router;