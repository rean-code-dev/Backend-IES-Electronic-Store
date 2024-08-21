const db = require("../database")
const {isEmptyOrNull} = require("../utils/service")


//================ Get Order Status=========
const getAll_orderStatus =async(req,res)=>{
    var result = await db.query('SELECT * FROM order_status')
    res.json({
        result : result
    })

}
///=================== Create Order Status ============
const create_orderStatus = async (req,res) =>{
    var {name,message,short_order} = req.body
    var sql = "INSERT INTO order_status (name,message,sort_order) VALUES (?,?,?)"
    var param = [name,message,short_order]
    var data = await db.query(sql,param)
    res.json({
        message: "Product Add!",
        result:data
    })

}

///==================== Remove Order Status============
const remove_orderStatus = async (req,res) =>{
    var {order_status_id} = req.body
    var sql = "DELETE FROM order_status WHERE order_status_id =?"
    var data = await db.query(sql,[order_status_id])
    res.json({
        message: "Product remove from your order status!",
        result:data
    })

}


module.exports ={
    getAll_orderStatus,
    create_orderStatus,
    remove_orderStatus
}