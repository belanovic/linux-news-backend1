const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const config = require('config');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1); 
} 

app.use(function (req, res, next) {  
    /* if((req.headers.origin && (req.headers.origin.includes('http://localhost')) || req.headers.origin == 'https://linux-news-cms.onrender.com')) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin); 
    } */
    
    // Website you wish to allow to connect

    //  res.setHeader('Access-Control-Allow-Origin', '*'); 

     // res.setHeader('Access-Control-Allow-Origin', req.get('origin')); 
    
   
     /* console.log(req.get('host'))  
     
     console.log(req.headers.host)  

     console.log(req.hostname)  

     console.log(req.get('origin'))  

     console.log(req.headers.origin) */   

    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    /* res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type'); */
    res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    res.setHeader('Access-Control-Allow-Origin', 'https://linux-news-cms.onrender.com'); 


    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
})


require('./startup/headers')(app);
require('./startup/parsers')(app);
require('./startup/routers')(app);

app.get('/n', (req, res) => {
    res.send('proba uspela')
    res.end()
})

const hostIP = config.get('hostIP');
const port = process.env.PORT || 4000; 

server.listen(port, hostIP, () => console.log(`Server is listening on port ${port}`));


require('./startup/db')();