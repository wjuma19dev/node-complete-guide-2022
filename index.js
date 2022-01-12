require('dotenv').config();
const http = require('http');
const express = require('express');
const errorhandler = require('errorhandler');
const morgan = require('morgan');

const path = require('path');
const rootDir = require('./util/path');
const port = process.env.PORT | 3000;

const app = express();
const server = http.createServer(app);

// Engine Template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

// Body Parser EXPRESS
app.use(express.urlencoded({extended: false}));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
  app.use(morgan('tiny'));
}

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
  port,
  console.log(`Server running on port ${port}`)
);