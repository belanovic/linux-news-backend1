const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
const config = require('config');


if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}
require('./startup/headers')(app)
require('./startup/routes')(app)


app.use(express.json({
        type: ['application/json', 'text/plain'],
        limit: '50mb'
    }));
app.use(express.urlencoded({extended: true}));



app.use(cookieParser());   


process.env.TZ = "Europe/Belgrade";
const HOST_BACKEND = process.env.HOST_BACKEND || 'localhost';
const port = process.env.PORT || 4000;



server.listen(port, HOST_BACKEND, () => console.log(`Server is listening on port ${port}`));

require('./startup/db')()