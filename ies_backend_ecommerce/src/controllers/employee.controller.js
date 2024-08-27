const db = require("../database")
const {isEmptyOrNull} = require("../utils/service")
const multer = require('multer');
const path = require('path');

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
const getAll_employee =async(req,res)=>{
    var result = await db.query('SELECT * FROM employee')
    res.json({
        result : result
    })

}

const getOne_employee = async(req,res) =>{

}

//=================== Insert Employee ===============
 const create_employee = (req,res)=>{
    const {
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
    }=req.body
    //const image = req.file ? req.file.filename : null; // Get the uploaded image filename
    var message = {}
    if(isEmptyOrNull(firstname)){
        message.firstname = "first name required!"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "last name required!"
    }
    if(isEmptyOrNull(position)){
        message.position = "position name required!"
    }
    if(Object.keys(message).length >0){
        res.json({
            err : true,
            message : message
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
    db.query(sql,param_sql,(err,row)=>{
        if(err){
            res.json({
                message : err,
                err : true
            })
        }
        else{
            res.json({
                message : "Employee create successfully!",
                data : row
            })
        }
    })
 }

//  ///================================= update employeee ============================ 

//  const update_employee = (req,res) =>{
//     const {
//         employee_id,
//         firstname,
//         lastname,
//         gender,
//         position,
//         image,
//         dob,
//         phone,
//         email,
//         base_salary,
//         address,
//         province,
//         country,
//         status,
//     }=req.body
//     var message = {}
//     if(isEmptyOrNull(employee_id)){
//         message.employee_id = "employee id required!"
//     }
//     if(isEmptyOrNull(firstname)){
//         message.firstname = "first name required!"
//     }
//     if(isEmptyOrNull(lastname)){
//         message.lastname = "last name required!"
//     }
//     if(isEmptyOrNull(position)){
//         message.position = "position name required!"
//     }
//     if(Object.keys(message).length >0){
//         res.json({
//             err : true,
//             message : message
//         })
//         return
//     }
//     var sql = "UPDATE employee SET firstname=?,lastname=?,gender=?,position=?,image=?,dob=?,phone=?email=?,base_salary=?,address=?,province=?,country=?,status=? WHERE employee_id=?"
//     var param_sql = [firstname,lastname,gender,position,image,dob,phone,email,base_salary,address,province,country,status,employee_id]
//     db.query(sql,param_sql,(err,row)=>{
//         if(err){
//             res.json({
//                 message : err,
//                 err : true
//             })
//         }
//         else{
//             res.json({
//                 message : "Employee Update successfully!",
//                 data : row
//             })
//         }
//     })
//  }
 //============================== Remove Employee ============================
 const remove_employee = (req,res) =>{
    var {id} = req.params
    var sql = "DELETE FROM employee WHERE employee_id = ?"
    db.query(sql,[id],(err,row)=>{
        if(err){
            res.json({
                err:true,
                message:err
            })
        }else{
            res.json({
                message : (row.affectedRows !=0)?"Delete Employee successfuly!": "Data not in system",
                data : row
            })
        }
    })

 }

module.exports ={
    getAll_employee,
    getOne_employee,
    create_employee,
    // update_employee,
     remove_employee
}