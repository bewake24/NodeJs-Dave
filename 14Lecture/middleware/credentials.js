const allowedOrigins = require('../config/allowedOrigins.js');

const credentials = (req, res, next)=> {
    const origin = req.headers.origins;
    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;