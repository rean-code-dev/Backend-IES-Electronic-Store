const { raw } = require("mysql")
const db = require("../database")
const { isEmptyOrNull, KEY_TOKEN } = require("../utils/service")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//================================= Get All Cutstomer ================
const getAll_customer = () => {

}

const getOne_customer = () => {

}
const create_customer = () => {
}
const update_customer = () => {

}
const remove_customer = (req, res) => {
    var sql = "UPDATE customer SET is_active =0 WHERE customer_id = ?"
    db.query(sql, [req.params.id], (error, row) => {
        if (!error) {
            res.json({
                message: (row.affectedRows != 0) ? "Delete Customer successfuly!" : "Data not in system",
                result: row
            })
        }
        else {
            res.json({
                error: true,
                message: error
            })
        }

    })

}
///======================= get role by customer ============
const getPermissionByCustomer = async (customer_id) => {
    var sql = "SELECT" +
        " p.code" +
        " FROM customer c" +
        " INNER JOIN role r ON c.role_id = r.role_id" +
        " INNER JOIN role_permission rp ON r.role_id = rp.role_id" +
        " INNER JOIN permission p ON rp.permission_id = p.permission_id" +
        " WHERE c.customer_id = ?"
    var result = await db.query(sql,[customer_id])
    return result;

}
///====================== Login =====================
const login = async (req, res) => {
    var { username, password } = req.body;
    var message = {};
    if (isEmptyOrNull(username)) {
        message.username = "Please fill in username!"
    }
    if (isEmptyOrNull(password)) {
        message.password = "Please fill in password!"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message,

        })
    }
    var user = await db.query("SELECT * FROM customer WHERE username = ?", [username]);
    if (user.length > 0) {
        var passDb = user[0].password // get password form DB
        var incorrect = bcrypt.compareSync(password, passDb)
        if (incorrect) {
            var user = user[0]
            delete user.password ///  delete column password from user
            var permission = await getPermissionByCustomer(user.customer_id)
            var obj = {
                user: user,
                permission: permission,
                token: ""  //generate token JWT
            }

            var access_token = jwt.sign({ data: { ...obj } }, KEY_TOKEN,{expiresIn: "1h"})
           
            res.json({
                ...obj,
                access_token: access_token
            })
        } else {
            res.json({
                message: "Password is incorrect!",
                error: true
            })
        }

    } else {
        res.json({
            message: "Account does't exist! Please go to register",
            error: true
        })
    }


}



///==================================== Address ======================
const getList_address = (req, res) => {

}
module.exports = {
    getAll_customer,
    getOne_customer,
    create_customer,
    update_customer,
    remove_customer,
    login,

    getList_address

}