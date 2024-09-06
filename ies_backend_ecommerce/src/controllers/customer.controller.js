const { json } = require("express")
const { raw } = require("mysql")
const db = require("../database")
const { isEmptyOrNull, KEY_TOKEN } = require("../utils/service")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//================================= Get All Cutstomer ================
const getAll_customer = () => {
    var sql = "SELECT customer_id, firstname, lastname, gender, username, is_active, create_at FROM customer"
    db.query(sql,(err,row)=>{
        if(err){
            res.json({
                message: err,
                err:true
            })
        }else{
            res.json({
                result:row
            })
        }
    })

}

///====================== get one customer ===========
const getOne_customer = () => {
    var id = req.params.id
    var sql = " SELECT customer_id, firstname, lastname, gender, username, is_active, create_at FROM customer WHERE customer_id = ?"
    db.query(sql,[id],(err,row)=>{
        if(err){
            res.json({
                message : err,
                err : true
            })
        }else{
            res.json({
                result:row
            })
        }
    })

}

///==================== create customer ===========

const create_customer = (req,res) => {
    
    var {
        username,
        password,
        firstname,
        lastname,
        gender,
        province_id,
        address_des
    } =req.body;

    
    //validate paramters
    var message = {}
    if(isEmptyOrNull(username)){message.username = "username required!"}
    if(isEmptyOrNull(password)){message.password = "password required!"}
    if(isEmptyOrNull(firstname)){message.firstname = "firstname required!"}
    if(isEmptyOrNull(lastname)){message.lastname = "lastname required!"}
    if(isEmptyOrNull(gender)){message.gender = "gender required!"}
    if(isEmptyOrNull(province_id)){message.province_id = "province_id required!"}

    if(Object.keys(message).length >0){
        res,json({
            error: true,
            message: message
        })

        return false
    }

    //end validate
    var sqlFind = "SELECT customer_id FROM customer WHERE username = ? " //check customer by username
    db.query(sqlFind,[username],(error1,result1)=>{
        if(result1.length > 0){
            res.json({
                error:true,
                message: "Account already exist!"
            })
            return false;
        }else{ 
            //bycript password from client
            password = bcrypt.hashSync(password,10)

            var sqlCustomer = "INSERT INTO customer (firstname, lastname, gender, username, password) VALUES (?, ?, ?, ?, ?)"
            var paramCustomer = [firstname, lastname, gender, username, password]
            db.query(sqlCustomer,paramCustomer,(error2,reuslt2)=>{
                if(!error2){
                    //insert customer address
                    var sqlCustomerAdd = "INSERT INTO customer_address (customer_id, province_id, firstname, lastname, tel, address_des) VALUES (?, ?, ?, ?, ?, ?)"
                    var paramCustomerAdd = [reuslt2.insertId, province_id, firstname, lastname, username, address_des]
                    db.query(sqlCustomerAdd,paramCustomerAdd,(error3,result3)=>{
                        if(!error3){
                            res.json({
                                message: "Account Create!",
                                data: result3
                            })
                            db.commit()
                        }else{
                            db.rollback()
                            res.json({
                                error: true,
                                message: error3
                            })
                            
                        }
                    })
                }
            })

            

        }
    })


}

///=============== Update customer ==============
const update_customer = () => {

    const {
        customer_id,
        firstname,
        lastname,
        gender,
    } = req.body
    //check with field required

    var message = {}
    if(isEmptyOrNull(customer_id)){message.customer_id = "customer id required!"}
    if(isEmptyOrNull(firstname)){message.firstname = "firstname required!"}
    if(isEmptyOrNull(lastname)){message.lastname = "lastname required!"}
    if(isEmptyOrNull(gender)){message.gender = "gender required!"}

    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return;
    }

    var sql = "UPDATE customer SET firstname=?, lastname=?, gender=? WHERE customer_id =? "
    var param_sql = [firstname,lastname,gender,customer_id]
    db.query(sql,param_sql,(error,row)=>{
        if(error){
            res.json({
                error:true,
                message:error
            })
        }else{
            res.json({
                message : row.affectedRows ? "Update successfully!" : "Data not in system!",
                result: row
            })
        }
    })


}

///========================= Remove Customer ==================
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
            
            var obj = {
                user: user,
                permission: [],
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
    var {
        customer_id
    } =req.body
    var sql = "SELECT * FROM customer_address WHERE customer_id = ?"
    db.query(sql,[customer_id],(error,row)=>{
        if(!error){
            res.json({
                list: row
            })
        }
    })

}

const listOne_address = (req,res)=>{
    var {
        customer_id
    } =req.body
    var sql = "SELECT * FROM customer_address WHERE customer_address_id = ?"
    db.query(sql,[customer_id],(error,row)=>{
        if(!error){
            res.json({
                list: row
            })
        }
    })
}

        
const new_Address = (req,res)=>{
    var {
        customer_id,
        firstname,
        lastname,
        tel,
        province_id,
        address_des
    } =req.body

    var message = {}

    if(isEmptyOrNull(customer_id)){message.customer_id = " customer_id resuired!"}
    if(isEmptyOrNull(firstname)){message.firstname = " firstname resuired!"}
    if(isEmptyOrNull(lastname)){message.lastname = " lastname resuired!"}
    if(isEmptyOrNull(tel)){message.tel = " tel resuired!"}
    if(isEmptyOrNull(province_id)){message.province_id = "province_id resuired!"}
    if(isEmptyOrNull(address_des)){message.address_des = " address_ des resuired!"}

    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return;
    }

    var sql = "INSERT INTO customer_address (customer_id, province_id, firstname, lastname, tel, address_des) VALUES (?,?,?,?,?,?)"
    var param_sql = [customer_id,province_id,firstname,lastname,tel,address_des]
    db.query(sql,param_sql,(error,row)=>{
        if(error){
            res.json({
                error:true,
                message:error
            })
        }else{
            res.json({
                message : row.affectedRows ? "Create successfully!" : "Data not in system!",
                data: row
            })
        }
    })
}
const update_Address = (req,res)=>{
    var {
        customer_address_id,
        customer_id,
        firstname,
        lastname,
        tel,
        province_id,
        address_des
    } =req.body

    var message = {}

    if(isEmptyOrNull(customer_address_id)){message.customer_address_id = " customer_address_id resuired!"}
    if(isEmptyOrNull(customer_id)){message.customer_id = " customer_id resuired!"}
    if(isEmptyOrNull(firstname)){message.firstname = " firstname resuired!"}
    if(isEmptyOrNull(lastname)){message.lastname = " lastname resuired!"}
    if(isEmptyOrNull(tel)){message.tel = " tel resuired!"}
    if(isEmptyOrNull(province_id)){message.province_id = "province_id resuired!"}
    if(isEmptyOrNull(address_des)){message.address_des = " address_ des resuired!"}

    if(Object.keys(message).length > 0){
        res.json({
            error: true,
            message: message
        })
        return;
    }

    var sql = "UPDATE customer_address SET customer_id =?, province_id=?, firstname=?, lastname=?, tel=?, address_des=? WHERE customer_address_id = ?"
    var param_sql = [customer_id,province_id,firstname,lastname,tel,address_des,customer_address_id]
    db.query(sql,param_sql,(error,row)=>{
        if(error){
            res.json({
                error:true,
                message:error
            })
        }else{
            res.json({
                message : row.affectedRows ? "Update successfully!" : "Data not in system!",
                data: row
            })
        }
    })
}
const remove_Address = (req,res)=>{
    var {
        customer_id
    } =req.body
    var sql = "DELETE FROM customer_address WHERE customer_address_id = ?"
    db.query(sql,[customer_id],(error,row)=>{
        if(!error){
            res.json({
                message : row.affectedRows ? "Delete success! " : "Not found is system!"
            })
        }
    })
}
module.exports = {
    getAll_customer,
    getOne_customer,
    create_customer,
    update_customer,
    remove_customer,
    login,

    getList_address,
    listOne_address,
    new_Address,
    update_Address,
    remove_Address,

}