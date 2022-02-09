require('dotenv').config();
const http = require('http');
const express = require('express');
const errorhandler = require('errorhandler');
const morgan = require('morgan');

const path = require('path');
const rootDir = require('./util/path');
const port = process.env.PORT | 3000;

const shopRoutes = require('./router/shop');
const adminRoutes = require('./router/admin');
const authRoutes = require('./router/auth');

const mongoose = require('mongoose');
const User = require('./model/user');

const app = express();
const server = http.createServer(app);

// Engine Template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

// Body Parser EXPRESS
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
  User.findById('61e229751ea70a0cf9d741ee')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(console.log)
});

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
  app.use(morgan('tiny'));
}

// Static Files EXPRESS
app.use('/public', express.static(path.join(rootDir, 'public')))

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', {
    docTitle: '404 page'
  });
})


mongoose.connect('mongodb+srv://wjuma19dev:CwPjwShIVokPAxQY@cluster0.kzzrx.mongodb.net/shopify')
  .then(() => {
    User.findOne({ _id: '61e229751ea70a0cf9d741ee'})
      .then(userDB => {
        if(!userDB) {
          const user = new User({
            name: 'wilson juma',
            email: 'wjuma19dev@gmail.com',
            cart: { items: [] }
          })
          user.save();
        }
      })
      .catch(error => console.log(error));
    server.listen(
      port,
      console.log(`Server running on port ${port}`)
    );
  })
  .catch(error => console.log(error));


