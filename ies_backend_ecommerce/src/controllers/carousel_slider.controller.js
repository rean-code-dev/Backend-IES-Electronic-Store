const { json } = require("express")
const db = require("../database")
const {isEmptyOrNull} = require("../utils/service")


//================ Get Slider =========
const getAll_Slider =async(req,res)=>{
    var result = await db.query('SELECT * FROM slider')
    res.json({
        result : result
    })

}

///========================  Get One Slider =================
const getOne_Slider = async (req,res) =>{
    const {slider_id} = req.params;
    var sql = 'SELECT * FROM product WHERE slider_id =?'
    var result = await db.query(sql,[slider_id])
   
    res.json({
        result : result
    })
}

///========================  create Slider =================
const create_Slider  =  (req,res) =>{
    var {
        name, 
        image,
        status 
    } = req.body;

    var message ={}
    if(isEmptyOrNull(name)){
        message.name = "name id required!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return false;
    }
    
    var sql = "INSERT INTO slider (slider_id,name,image,status) VALUES (?,?,?,?)"
    var param = [slider_id,name,image,status]
    var result = db.query(sql,param)
    res.json({
        message : "Create slider Success!",
        result :result
    })
}


///========================  update Slider =================
const update_Slider  = async (req,res) =>{
    var {
        slider_id,
        name, 
        image,
        status 
        
    } = req.body;

    var message ={}
    if(isEmptyOrNull(slider_id)){
        message.slider_id = "Slide id required!"
    }

    if(isEmptyOrNull(name)){
        message.name = "Name required!"
    }

    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return false;
    }
    
    var sql = "UPDATE product SET name =? ,image=?,status =? WHERE slider_id =?"
    var param = [name,image,status,slider_id]
    var result = db.query(sql,param)
    res.json({
        message : "Update Slider Success!",
        result :result
    })
}


///========================  remove Slider =================
const remove_Slider  = async (req,res) =>{
    const {slider_id} = req.body
    var sql = 'DELETE * FROM slider WHERE slider_id =?'
    var result = await db.query(sql,[slider_id])
   
    res.json({
        message : "Remove Succcess!",
        result : result
    })
}


module.exports ={
    getAll_Slider,
    getOne_Slider,
    create_Slider,
    update_Slider,
    remove_Slider,
}