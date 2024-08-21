const { json } = require("express")
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
    const {product_id} = req.params;
    var sql = 'SELECT * FROM product WHERE product_id =?'
    var result = await db.query(sql,[product_id])
   
    res.json({
        result : result
    })
}

///========================  create Product =================
const create_product  =  (req,res) =>{
    var {
        category_id, 
        barcode,
        name, 
        quantity, 
        price, 
        image, 
        description, 
        
    } = req.body;

    var message ={}
    if(isEmptyOrNull(category_id)){
        message.category_id = "Category id required!"
    }
    if(isEmptyOrNull(barcode)){
        message.barcode = "Barcode required!"
    }
    if(isEmptyOrNull(name)){
        message.name = "Name required!"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "Quantity required!"
    }
    if(isEmptyOrNull(price)){
        message.price = "Price required!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return false;
    }
    
    var sql = "INSERT INTO product (category_id,barcode,name,quantity,price,image,description) VALUES (?,?,?,?,?,?,?)"
    var param = [category_id,barcode,name,quantity,price,image,description]
    var result = db.query(sql,param)
    res.json({
        message : "Create product Success!",
        result :result
    })
}


///========================  update Product =================
const update_product  = async (req,res) =>{
    var {
        product_id,
        category_id, 
        barcode,
        name, 
        quantity, 
        price, 
        image, 
        description, 
        
    } = req.body;

    var message ={}
    if(isEmptyOrNull(product_id)){
        message.product_id = "Product id required!"
    }
    if(isEmptyOrNull(category_id)){
        message.category_id = "Category id required!"
    }
    if(isEmptyOrNull(barcode)){
        message.barcode = "Barcode required!"
    }
    if(isEmptyOrNull(name)){
        message.name = "Name required!"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "Quantity required!"
    }
    if(isEmptyOrNull(price)){
        message.price = "Price required!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return false;
    }
    
    var sql = "UPDATE product SET category_id =? ,barcode=?,name =? ,quantity =? ,price =?,image=?,description =? WHERE product_id =?"
    var param = [category_id,barcode,name,quantity,price,image,description,product_id]
    var result = db.query(sql,param)
    res.json({
        message : "Update product Success!",
        result :result
    })
}


///========================  remove Product =================
const remove_product  = async (req,res) =>{
    const {product_id} = req.body
    var sql = 'DELETE * FROM product WHERE product_id =?'
    var result = await db.query(sql,[product_id])
   
    res.json({
        message : "Remove Succcess!",
        result : result
    })
}


///======================== changeProductStatus =================
const changeProductStatus_product  = async (req,res) =>{
    const {is_active} = req.body
    var sql = "UPDATE product SET is_active = ? WHERE product_id = ?"
    const result = await db.query(sql,[is_active])
    res.json({
        message : "Update product to " +(is_active == 0 ? "inactived" : "actived"),
        result : result
    })
}


module.exports ={
    getAll_product,
    getOne_product,
    create_product,
    update_product,
    remove_product,
    changeProductStatus_product,
   
}