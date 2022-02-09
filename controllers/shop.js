const Product = require('../model/product'),
      Cart = require('../model/cart'),
      Order = require('../model/order');

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
  req.user
    .populate('cart.items.productId')
    // .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        docTitle: 'Cart',
        products
      })
    })
    .catch(console.log);
}

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId)
    .then(product => {
      req.user.addToCart(product)
        .then(() => {
          res.redirect('/cart');
        })
    })
    .catch(console.log);
}

exports.postCartDelete = (req, res, next) => {
  const { productId } = req.body;
  req.user.deleteItemFromCart(productId)  
    .then(() => {
      res.redirect('/cart');
    })
    .catch(console.log);
}

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .populate('')
    // .execPopulate()
    .then(orders => {
      console.log(orders)
      res.render('shop/orders', {
        docTitle: 'Orders',
        orders
      });
    });
}

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = _.map(user.cart.items, value => {
        return {
          quantity: value.quantity,
          product: {...value.productId._doc}
        }
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products
      })
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
        })
    .catch(console.log)
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    docTitle: 'Checkout'
  })
}