const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const app = express();
const server = http.createServer(app);
const routerArticles = require('./routes/allArticles');
const article = require('./routes/oneArticle');
const frontpageArticles = require('./routes/frontpageArticles')
const articlePosition = require('./routes/articlePosition')

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*'  /* `http://localhost:3000` */);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json({type: ['application/json', 'text/plain']}));
app.use(express.urlencoded({extended: true}));

mongoose.set('useFindAndModify', false);


app.use('/', routerArticles);
app.use('/', article);
app.use('/', frontpageArticles);
app.use('/', articlePosition);

// Add headers

mongoose.connect('mongodb://localhost/news', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log(err))

const port = process.env.PORT || 4000;

server.listen(port, '192.168.1.2', () => console.log(`Server is listening on port ${port}`));
