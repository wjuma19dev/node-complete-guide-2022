const Product = require('../model/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    docTitle: 'Add product',
    editing: false
  })
}

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product({title, price, imageUrl, description});
  product.save()
    .then(produc => {
      res.redirect('/');
    })
    .catch(error => console.log(error));
}

exports.getEditProduct = (req, res, next) => {
  const editMode = Boolean(req.query.edit);
  const { productId } = req.params;
  if (!editMode) {
    res.redirect('/');
  }
  Product.findById(productId)
    .then(product => {
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
  
  Product.findByIdAndUpdate(productId, {  title, imageUrl, price, description }, { new: true })
    .then(product => {
      console.log(product);
      res.redirect('/admin/products');
    });

}

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findByIdAndRemove(productId)
    .then(product => {
      console.log(product);
        res.redirect('/admin/products');
    });
}

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('admin/products', {
        docTitle: 'Admin products',
        products
      })
    });
}
