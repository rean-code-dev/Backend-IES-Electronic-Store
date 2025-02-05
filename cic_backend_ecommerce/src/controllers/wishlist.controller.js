const db = require ("../database")
const {isEmptyOrNull} = require("../utils/service")

// ========================================= getAll WishList ===================================================
const getAll_wishlist = async(req,res)=>{
    var {customer_id} = req.body
    var sql = "SELECT * FROM wishlist WHERE customer_id";
    // const sql = "SELECT wl.id, p.* FROM wishlist wl"
    // sql += "INNER JOIN product p ON (p.product_id = wl.product_id)"
    // sql += "WHERE wl.customer_id = ?"
    var list = await db.query(sql,[customer_id])
    res.json({
        result:list
    })
}

const create_wishlist = async (req,res) =>{
    var {customer_id,product_id} = req.body
    var sql = "INSERT INTO wishlist (customer_id,product_id) VALUES (?,?)"
    var param = [customer_id,product_id]
    var data = await db.query(sql,param)
    res.json({
        message: "Product Add!",
        result:data
    })

}

const remove_wishlist = async (req,res) =>{
    var {wishlist_id} = req.body
    var sql = "DELETE FROM wishlist WHERE wishlist_id = ?"
    var data = await db.query(sql,[wishlist_id])
    res.json({
        message : "Product Remove from your wishlist!",
        result: data
    })

}
module.exports ={
    getAll_wishlist,
    create_wishlist,
    remove_wishlist,
}
