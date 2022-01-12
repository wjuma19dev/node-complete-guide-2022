const Product = require('../model/product'),
      Cart = require('../model/cart');

const _ = require('lodash');
      
exports.getProducts = (req, res, next) => {
  Product.find(products => {
    res.render('shop/product-list', { 
      docTitle: 'Products',
      products
    });
  });
}

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId, product => {
    res.render('shop/product-detail', { 
      docTitle: product.title,
      product
    });
  });
}

exports.getIndex = async (req, res, next) => {
  Product.find(products => {
    res.render('shop/index', { 
      docTitle: 'Shop',
      products
    });
  });
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.find(products => {
      const cartproducts = [];
      for (product of products) {
        const cartProductData = _.find(cart.products, { id: String(product.id) });
        if(cartProductData) {
          cartproducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        docTitle: 'Cart',
        products: cartproducts,
        total: cart.totalPrice
      })
    });
  });
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price, () => {
      res.redirect('/cart');
    });
  });
}

exports.postCartDelete = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price, () => {
      res.redirect('/cart');
    })
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    docTitle: 'Orders'
  })
}


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    docTitle: 'Checkout'
  })
}