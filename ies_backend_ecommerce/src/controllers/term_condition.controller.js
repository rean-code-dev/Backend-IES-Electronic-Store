const db = require ("../database")
const {isEmptyOrNull} = require("../utils/service")

const getAllTermAndCondition = async(req,res)=>{
    var sql = "SELECT * FROM termCondition";
   
    var list = await db.query(sql)
    res.json({
        result:list
    })
}

module.exports =  {
    getAllTermAndCondition
}
