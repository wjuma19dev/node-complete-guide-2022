const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/admin', require('./router/admin'));
app.use(require('./router/shop'));

app.use((req, res, next) => {
  res.status(404).send(`
  
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Page not found</h1>
        </div>
      </div>
    </div>
  
  `);
})

server.listen(
  3000,
  console.log('Server running on port 3000')
);