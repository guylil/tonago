const express = require('express');
const app = express();
const books = require('./assets/books.json');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/books/v1/volumes/', function(req, res) {
   // console.log('req: ', req.query);
   // console.log(books.items[0].volumeInfo);
   res.send({
       kind: 'books#volumes',
       totalItems: books.items.length,
       items: (req.query.q ==='*')?
           books.items : books.items.filter(item => item.volumeInfo.title.includes(req.query.q)),
   });
});

app.listen(3000, () => console.log('Server is listening at 3000'));
