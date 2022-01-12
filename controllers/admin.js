const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    docTitle: 'Add product',
    editing: false
  })
}

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product(null, title, price, imageUrl, description);
  product.save();
  res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
  const editMode = Boolean(req.query.edit);
  const { productId } = req.params;
  if (!editMode) {
    res.redirect('/');
  }
  Product.findById(productId, product => {
    res.render('admin/add-product', {
      docTitle: 'Edit product',
      editing: editMode,
      product
    });
  });
}

exports.postEditProduct = (req, res, next) => {
  const { productId } = req.body;
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(productId, title, price, imageUrl, description);
  product.save();
  res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.deleteById(productId, () => {
    res.redirect('/admin/products');
  });
}

exports.getProducts = (req, res, next) => {
  Product.find(products => {
    res.render('admin/products', {
      docTitle: 'Admin products',
      products
    })
  });
}
