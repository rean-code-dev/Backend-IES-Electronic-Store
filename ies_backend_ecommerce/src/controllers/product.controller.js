const db = require("../database")
const {isEmptyOrNull} = require("../utils/service")


//================ Get Product =========
const getAll_product =async(req,res)=>{
    var result = await db.query('SELECT * FROM product')
    res.json({
        result : result
    })

}

///========================  Get One Product =================
const getOne_product  = async (req,res) =>{
    var sql = ""
}

module.exports ={
    getAll_product,
   
}