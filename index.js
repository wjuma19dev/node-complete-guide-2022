const http = require('http');
const express = require('express');
const errorhandler = require('errorhandler');

const path = require('path');
const rootDir = require('./util/path');

const app = express();
const server = http.createServer(app);

// Engine Template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

// Body Parser EXPRESS
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(errorhandler());

// Static Files EXPRESS
app.use('/public', express.static(path.join(rootDir, 'public')))

// Routes
app.use('/admin', require('./router/admin'));
app.use(require('./router/shop'));

app.use((req, res, next) => {
  res.status(404).render('404', {
    docTitle: '404 page'
  });
})

server.listen(
  3000,
  console.log('Server running on port 3000')
);