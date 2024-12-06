const db = require("../database")
const { isEmptyOrNull, KEY_TOKEN, REFRESH_TOKEN, KEY_REFRESH_TOKEN } = require("../utils/service")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require('multer');
const path = require('path');
const { getPermissionUser } = require("./auth.controller");

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid filename conflicts
    }
});

// Initialize multer
const upload = multer({ storage: storage });




//================ Get Employee =========
const getAll_employee = async (req, res) => {
    var result = await db.query('SELECT * FROM employee')
    res.json({
        result: result
    })

}

const getOne_employee = async (req, res) => {
    var id = req.params.id
    var sql = "SELECT * FROM employee WHERE employee_id = ?"
    db.query(sql, [id], (err, row) => {
        if (err) {
            res.json({
                message: err,
                err: true
            })
        } else {
            res.json({
                result: row
            })
        }
    })

}

//=================== Insert Employee ===============
const create_employee = (req, res) => {
    const {
        firstname,
        lastname,
        gender,
        position,
        image,
        dob,
        phone,
        password,
        email,
        base_salary,
        address,
        province,
        country,
        status,
    } = req.body
    //const image = req.file ? req.file.filename : null; // Get the uploaded image filename
    var message = {}
    if (isEmptyOrNull(firstname)) {
        message.firstname = "first name required!"
    }
    if (isEmptyOrNull(lastname)) {
        message.lastname = "last name required!"
    }
    if (isEmptyOrNull(position)) {
        message.position = "position name required!"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            err: true,
            message: message
        })
        return
    }
    var sql = "INSERT INTO employee (`firstname`, `lastname`, `gender`, `position`, `image`, `dob`, `phone`, `email`, `base_salary`, `address`, `province`, `country`, `status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
    var param_sql =
        [
            firstname,
            lastname,
            gender,
            position,
            image,
            dob,
            phone,
            email,
            base_salary,
            address,
            province,
            country,
            status
        ]
    db.query(sql, param_sql, (err, row) => {
        if (err) {
            res.json({
                message: err,
                err: true
            })
        }
        else {
            res.json({
                message: "Employee create successfully!",
                result: row
            })
        }
    })
}

const refreshToken = async (req,res) =>{

    //check and verify resfresh token fro client
    var {refresh_key} = req.body;
    if(isEmptyOrNull(refresh_key)){
        res.status(401).send({
            message: "Unauthorized",

        });
    }else{
        jwt.verify(refresh_key,KEY_REFRESH_TOKEN,(error,result)=>{
            if(error){
                res.status(401).send({
                    message: "Unauthorized",
                    error: error
                });
            }else{
                //សុំសិទ្ធទាញយក Token ថ្មី
                res.json({
                    data_after_refresh: result
                })
            }
        })
    }

}

///====================== Login Employee =====================
const login = async (req, res) => {
    var { phone, password } = req.body;
    var message = {};
    if (isEmptyOrNull(phone)) {
        message.phone = "Please fill in phone!"
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
    var user = await db.query("SELECT * FROM employee WHERE phone = ?", [phone]);
    if (user.length > 0) {
        var passDb = user[0].password // get password form DB
        var incorrect = bcrypt.compareSync(password, passDb)
        if (incorrect) {
            var user = user[0]
            delete user.password ///  delete column password from user
            var permission = await getPermissionUser(user.employee_id)
        
            var obj = {
                user: user,
                permission: permission,
            }
            var access_token = jwt.sign({ data: { ...obj } }, KEY_TOKEN,{expiresIn: "24h"})
            var refresh_token = jwt.sign({data:{...obj}},KEY_REFRESH_TOKEN)
           
            res.json({
                ...obj,
                access_token: access_token, 
                refresh_token : refresh_token
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


const setPassword = async (req, res) => {
    const {
        phone,
        password,

    } = req.body
    var message = {};
    if (isEmptyOrNull(phone)) {
        message.phone = "Please fill in phone!"
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
    var employee = await db.query("SELECT * FROM employee WHERE phone = ?", [phone]);
    if (employee.length > 0) {
        var passwordGenerate = bcrypt.hashSync(password, 10)
        console.log("=========",passwordGenerate)
        var update = await db.query("UPDATE employee SET password =? WHERE phone = ?", [passwordGenerate, phone])
        res.json({
            message: "Password Update!",

        })

    } else {
        res.json({
            message: "Account does't exist! Please go to register",
            error: true
        })
    }

}

//  ///================================= update employeee ============================ 

const update_employee = (req, res) => {
    const {
        employee_id,
        firstname,
        lastname,
        gender,
        position,
        image,
        dob,
        phone,
        email,
        base_salary,
        address,
        province,
        country,
        status,
    } = req.body
    var message = {}
    if (isEmptyOrNull(employee_id)) {
        message.employee_id = "employee id required!"
    }
    if (isEmptyOrNull(firstname)) {
        message.firstname = "first name required!"
    }
    if (isEmptyOrNull(lastname)) {
        message.lastname = "last name required!"
    }
    if (isEmptyOrNull(position)) {
        message.position = "position name required!"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            err: true,
            message: message
        })
        return
    }
    var sql = "UPDATE employee SET firstname=?,lastname=?,gender=?,position=?,image=?,dob=?,phone=?email=?,base_salary=?,address=?,province=?,country=?,status=? WHERE employee_id=?"
    var param_sql = [firstname, lastname, gender, position, image, dob, phone, email, base_salary, address, province, country, status, employee_id]
    db.query(sql, param_sql, (err, row) => {
        if (err) {
            res.json({
                message: err,
                err: true
            })
        }
        else {
            res.json({
                message: row.affectedRows ? "Update successfully!" : "Data not in system",
                result: row
            })
        }
    })
}
//============================== Remove Employee ============================
const remove_employee = (req, res) => {
    var { id } = req.params
    var sql = "DELETE FROM employee WHERE employee_id = ?"
    db.query(sql, [id], (err, row) => {
        if (err) {
            res.json({
                err: true,
                message: err
            })
        } else {
            res.json({
                message: (row.affectedRows != 0) ? "Delete Employee successfuly!" : "Data not in system",
                result: row
            })
        }
    })

}

module.exports = {
    getAll_employee,
    getOne_employee,
    create_employee,
    update_employee,
    remove_employee,
    login,
    setPassword,
    refreshToken
}