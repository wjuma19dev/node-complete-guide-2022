const Product = require('../model/product'),
      Cart = require('../model/cart');

const _ = require('lodash');
const User = require('../model/user');
      
exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', { 
        docTitle: 'Products',
        products
      });
    });
}

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      res.render('shop/product-detail', { 
        docTitle: product.title,
        product
      });
    });
}

exports.getIndex = async (req, res, next) => {

  Product.find()
    // .select('title price -_id')
    // .populate('userId', '_id name email')
    .then(products => {
      res.render('shop/index', { 
        docTitle: 'Shop',
        products
      });
    })

}

exports.getCart = (req, res, next) => {
  res.send('cart')
  // Cart.getCart(cart => {
  //   Product.find(products => {
  //     const cartproducts = [];
  //     for (product of products) {
  //       const cartProductData = _.find(cart.products, { id: String(product.id) });
  //       if(cartProductData) {
  //         cartproducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       docTitle: 'Cart',
  //       products: cartproducts,
  //       total: cart.totalPrice
  //     })
  //   });
  // });
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId)
    .then(product => {
      req.user.addToCart(product)
        .then(() => {
          res.redirect('/');
        })
    })
    .catch(console.log);
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