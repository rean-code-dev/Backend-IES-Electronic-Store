const db = require ("../database")
const {isEmptyOrNull} = require("../utils/service")


const getCartByCustomer = async (req,res) =>{
    const {customer_id} = req.body;
    // var sql = "SELECT * FROM cart WHERE customer_id = ?"

    var sql = "SELECT c.cart_id, c.quantity, p.* FROM cart c"
    sql += " INNER JOIN product p ON (c.product_id = p.product_id) "
    sql += "WHERE c.customer_id =?"

    var result = await db.query(sql,[customer_id])
    res.json({
        result : result
    })
}

const addToCart = async (req,res) =>{
    const {
        customer_id,
        product_id,
        quantity
    }= req.body;
    message = {}
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "Customer id required!"
    }
    if(isEmptyOrNull(product_id)){
        message.product_id = "Product id required!"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "Quantity required!"
    }
    if(Object.keys (message).length > 0){
        res.json({
            error : true,
            message : message
        })
    }
    var sql = "INSERT INTO cart (customer_id,product_id,quantity) VALUES (?,?,?)"
    var data  = db.query(sql,[customer_id,product_id,quantity])
    res.json({
        message :  "Add to cart Success!",
        result : data
    })
    




}

const updatCart = async (req,res) =>{
    const {
        cart_id,
        quantity
    } = req.body
    var message = {}
    if(isEmptyOrNull(cart_id)){
        message.cart_id = "Cart id required!"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "Quantity id required!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message: message
        })
    }
    var sql = "UPDATE cart SET quantity=(quantity+?) WHERE cart_id = ?"
    var result = await db.query(sql,[quantity,cart_id])
    res.json({
        message : "Cart Update Success!",
        result : result
    })

}
const removeCart = async (req,res) =>{
    var result = await db.query("DELETE From cart WHERE cart_id = ?",[req.body.cart_id])
    req.json({
        result : result,
        message : "Cart remove success!"
    })
}

module.exports = {
    getCartByCustomer,
    addToCart,
    updatCart,
    removeCart

}