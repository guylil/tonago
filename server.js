const express = require('express');
const app = express();
const books = require('./assets/books.json');
const path = require('path');
const serveStatic = require('serve-static');
const PORT = process.env.PORT || 5000;
const HOST = process.env.YOUR_HOST || '0.0.0.0';

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', serveStatic('./public/', {'index': 'index.html'}));

app.get('/books/v1/volumes/', function(req, res) {
   res.send({
       kind: 'books#volumes',
       totalItems: books.items.length,
       items: (req.query.q ==='*')?
           books.items : books.items.filter(item => item.volumeInfo.title.includes(req.query.q)),
   });
});

app.listen(PORT, HOST, () => console.log('Server is listening at ', PORT));
