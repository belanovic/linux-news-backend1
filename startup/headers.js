const cors = require("cors");
module.exports = function (app) {

    // app.use(cors({ origin: ["http://localhost:3000"] }));
    app.use(function (req, res, next) {  
        
        // Website you wish to allow to connect
        /* res.setHeader('Access-Control-Allow-Origin', '*'); */
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
        // Request headers you wish to allow
        /* res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type'); */
        res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

        
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
    });
}
