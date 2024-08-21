const { raw } = require("mysql")
const db = require ("../database")

//================================= Get All Cutstomer ================
const getAll_customer = ()=>{

}
const remove_customer = (req,res) =>{
    var sql = "UPDATE customer SET is_active =0 WHERE customer_id = ?"
    db.query(sql,[req.params.id],(error,row)=>{
        if(!error){
            res.json({
                message : (row.affectedRows !=0)?"Delete Customer successfuly!": "Data not in system",
                result : row
            })
        }
        else{
            res.json({
                error: true,
                message:error
            })
        }

    })

}
module.exports= {
    getAll_customer,
    remove_customer

}