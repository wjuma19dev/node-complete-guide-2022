const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    docTitle: 'Add product'
  })
}

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product(title, price, imageUrl, description);
  product.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      res.redirect('/');
    });
}

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.render('shop/product-list', { 
    docTitle: 'Shop',
    products
  });
}