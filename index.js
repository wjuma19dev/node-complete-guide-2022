const http = require('http');
const express = require('express');

const path = require('path');
const rootDir = require('./util/path');

const app = express();
const server = http.createServer(app);

app.set('view engine', 'pug');
app.set('views', path.join(rootDir, 'views'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Static files
app.use('/public', express.static(path.join(rootDir, 'public')))

app.use('/admin', require('./router/admin'));
app.use(require('./router/shop'));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

server.listen(
  3000,
  console.log('Server running on port 3000')
);