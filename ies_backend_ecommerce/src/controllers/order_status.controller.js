const db = require("../database")
const {isEmptyOrNull} = require("../utils/service")


//================ Get Order Status=========
const getAll_orderStatus =async(req,res)=>{
    var result = await db.query('SELECT * FROM order_status')
    res.json({
        result : result
    })

}
const create_orderStatus = async (req,res) =>{
    var {customer_id,product_id} = req.body
    var sql = "INSERT INTO wishlist (customer_id,product_id) VALUES (?,?)"
    var param = [customer_id,product_id]
    var data = await db.query(sql,param)
    res.json({
        message: "Product Add!",
        result:data
    })

}


module.exports ={
    getAll_orderStatus,
   
}