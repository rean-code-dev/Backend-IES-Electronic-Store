const db = require ("../database")
const {isEmptyOrNull} = require("../utils/service")

// ========================================= getAll Payment_methode ===================================================
const getAll_payment_methode= async(req,res)=>{
    var {payement_methode_id} = req.body
    var sql = "SELECT * FROM payment_methode WHERE payement_methode_id";
    // const sql = "SELECT wl.id, p.* FROM wishlist wl"
    // sql += "INNER JOIN product p ON (p.product_id = wl.product_id)"
    // sql += "WHERE wl.customer_id = ?"
    var list = await db.query(sql,[payement_methode_id])
    res.json({
        result:list
    })
}

const create_payment_methode = async (req,res) =>{
    var {customer_id,product_id} = req.body
    var sql = "INSERT INTO payment_methode (customer_id,product_id) VALUES (?,?)"
    var param = [customer_id,product_id]
    var data = await db.query(sql,param)
    res.json({
        message: "Product Add!",
        result:data
    })

}

const remove_payment_methode = async (req,res) =>{
    var {payement_methode_id} = req.body
    var sql = "DELETE FROM payment_methode WHERE payement_methode_id = ?"
    var data = await db.query(sql,[payement_methode_id])
    res.json({
        message : "Product Remove from your payment methode!",
        result: data
    })

}
module.exports ={
    getAll_payment_methode,
    create_payment_methode,
    remove_payment_methode,
}
