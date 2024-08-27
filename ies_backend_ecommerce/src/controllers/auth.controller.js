const { KEY_TOKEN } = require("../utils/service");
const jwt = require("jsonwebtoken")


exports.userGuard = (req, res, next) => { ///get access token from client
    var authorization = req.headers.authorization; /// token from client 
    var token_from_client = null
    if (authorization != null && authorization != "") {
        token_from_client = authorization.split(" ")
        token_from_client = token_from_client[1]
    }
    if (token_from_client == null) {
        res.status(401).send({
            message: "Unauthorized",
        });
    } else {
        //======= verify token client and backend 
        jwt.verify(token_from_client, KEY_TOKEN, (error, result) => {
            if (error) {
                res.status(401).send({
                    message: "Unauthorized",
                });
            } else {
                req.user = result.data,
                req.user_id = result.data.user.customer_id  
                next();
            }
        })
    }
}