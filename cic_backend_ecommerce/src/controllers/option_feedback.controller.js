const db = require ("../database")
const {isEmptyOrNull} = require("../utils/service")

const getOptionFeedback = async(req,res)=>{
    var sql = "SELECT * FROM opinion_feedback";
   
    var list = await db.query(sql)
    res.json({
        result:list
    })
}


const create_OptionFeedback  = (req,res) =>{
    const {
        feedback,
        status,

    }=req.body

    var message = {}
    var fileName = null
    if(isEmptyOrNull(name_en)){
        message.feedback = "feedback required!"
    }

    if(Object.keys(message).length >0){
        res.json({
            err : true,
            message : message
        })
        return
    }
    if(req.file){ //check true upload file from frontend
        fileName = req.file.filename ///get file name
    }
   
    var sql  = 'INSERT INTO opinion_feedback (`feedback`,`image`) VALUES(?,?)'
    
    var param_data = [
        feedback,
        fileName,
        
    ]


    db.query(sql,param_data,(err,row)=>{
        if(err){
            res.json({
                message : err,
                err : true
            })
        }
        else{
            res.json({
                message : " FeedBack Successfully!",
                data : row
            })
        }
    })
}

module.exports =  {
    getOptionFeedback,
    create_OptionFeedback
}
