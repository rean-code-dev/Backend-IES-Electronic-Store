const db = require ("../database")
const {isEmptyOrNull} = require("../utils/service")
const getPromotonProduct = async (req,res) =>{
    var {product_id} = req.body
    var sql = "SELECT * FROM promotion WHERE product_id = ?"
    var result = await db.query(sql,[product_id])
    res.json({
        result : result
    })
}
module.exports = {
    getPromotonProduct
}