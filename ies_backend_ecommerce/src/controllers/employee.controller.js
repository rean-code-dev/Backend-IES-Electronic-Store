const db = require("../database")
const {isEmptyOrNull} = require("../utils/service")

//================ Get Employee =========
const getAll_employee = (req,res)=>{
    var result = 'SELECT * FROM employee'
    res.json({
        result : result
    })

}

//=================== Insert Employee ===============
 const create_employee = (req,res)=>{
    const {
        firstname,
        lastname,
        position,
        phone,
        image,
        dob,
        salary,
        email,
        address,
        country,
        status,
        description,
    }=req.body
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
    var sql = "INSERT INTO employee () VALUES ()"
    var param_sql = [firstname,lastname,position,phone,image,dob,salary,email,address,country,status,description]
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

 ///================================= update employeee ============================ 

 const update_employee = (req,res) =>{
    const {
        employee_id,
        firstname,
        lastname,
        position,
        phone,
        image,
        dob,
        salary,
        email,
        address,
        country,
        status,
        description,
    }=req.body
    var message = {}
    if(isEmptyOrNull(employee_id)){
        message.employee_id = "employee id required!"
    }
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
    var sql = "UPDATE employee SET firstname=?,lastname=?,position=?,phone=?,image=?,dob=?,salary=?,email=?,address=?,country=?,description=? WHERE employee_id=?"
    var param_sql = [firstname,lastname,position,phone,image,dob,salary,email,address,country,status,description,employee_id]
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
    create_employee,
    update_employee,
    remove_employee
}