const express = require('express');
const path = require('path');
const rootDir = require('../util/path');
// const { readFileSync, writeFileSync } = require('fs');

const router = express.Router();
// const Productos = path.join(__dirname, '../data/productos.json') 

router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});



module.exports = router;