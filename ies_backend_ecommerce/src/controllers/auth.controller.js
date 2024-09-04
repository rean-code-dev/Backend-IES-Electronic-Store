const { KEY_TOKEN } = require("../utils/service");
const jwt = require("jsonwebtoken")
const db = require("../database")

// exports.userGuard = (paramter)=>{
//     return (req, res, next)=>{
//         var authorization = req.headers.authorization; /// token from client 
//         var token_from_client = null
//         if (authorization != null && authorization != "") {
//             token_from_client = authorization.split(" ")
//             token_from_client = token_from_client[1]
//         }
//         if (token_from_client == null) {
//             res.status(401).send({
//                 message: "Unauthorized",

//             });
//         } else {
//             //======= verify token client and backend 
//             jwt.verify(token_from_client, KEY_TOKEN, (error, result) => {
//                 if (error) {
//                     res.status(401).send({
//                         message: "Unauthorized",
//                         error: error
//                     });
//                 } else {
//                     //================= check is have permission
//                     var permission = result.data.permission // get permission from verify token 
//                     if(permission.includes(paramter)){
//                         req.user = result.data,
//                         req.user_id = result.data.user.customer_id
//                         next();
//                     }else{
//                         res.status(401).send({
//                             message: "Unauthorized",

//                         });
//                     }

//                 }
//             })
//         }

//     }

// }

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
                    error: error
                });
            } else {
                //================= check is have permission
                var permission = result.data.permission // get permission from verify token 
                req.user = result.data,
                    req.user_id = result.data.user.customer_id
                next();
            }
        })
    }
}

///======================= get role User ===========
exports.getPermissionUser = async (id) => {
    // var sql = "SELECT"+
    //     " p.code"+
    //     " FROM employee c" +
    //     " INNER JOIN role r ON c.role_id = r.role_id" +
    //     " INNER JOIN role_permission rp ON r.role_id = rp.role_id" +
    //     " INNER JOIN permission p ON rp.permission_id = p.permission_id" +
    //     " WHERE c.employee_id = ?"

    var sql = "SELECT p.code" +
        " From employee e"+
        " INNER JOIN `role` r ON e.role_id = r.role_id"+
        " INNER JOIN role_permission rp ON r.role_id = rp.role_id"+
        " INNER JOIN permission p ON rp.permission_id = p.permission_id"+
        " WHERE e.employee_id = ?";

    var result = await db.query(sql, [id])
    var tempArr = [];
    result.map((item, index) => [
        tempArr.push(item.code)

    ])

    console.log("========", result)

    return tempArr;

}