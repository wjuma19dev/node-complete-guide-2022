const express = require('express');
// const path = require('path');
// const { readFileSync, writeFileSync } = require('fs');

const router = express.Router();
// const Productos = path.join(__dirname, '../data/productos.json') 

router.get('/add-product', (req, res, next) => {
  res.send(`

    <div style="width: 80%; margin: 0 auto; margin-top: 50px;">
      <form action="/add-product" method="POST">
        <div style="display: flex; flex-direction: column; margin-bottom: 15px;">
          <label style="font-size: 20px;">Title</label>
          <input name="title" type="text" style="width: 50%; height: 35px;font-size: 18px;">
        </div>
        <div style="display: flex; flex-direction: column; margin-bottom: 15px;">
          <label style="font-size: 20px;">Price</label>
          <input step="0.001" name="price" type="number" style="width: 50%; height: 35px;font-size: 18px;">
        </div>
        <div>
          <button style="padding: 9px; font-size: 18px; cursor: pointer" type="submit">Enviar</button>
        </div>
      </form>
    </div>
  
  `);
});



module.exports = router;