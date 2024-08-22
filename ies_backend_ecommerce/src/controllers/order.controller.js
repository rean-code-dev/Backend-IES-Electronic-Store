const db = require("../database")
const { isEmptyOrNull , invoiceNumber} = require("../utils/service")

// const generateInvoiceId = async () =>{
//     var data =await db.query("SELECT Max (order_id) as id FROM order")
//     return invoiceNumber(data[0].id)

// }
//=========================== Get All order ============================
const getAll_order = async (req, res) => {
    var data = await db.query("SELECT * FROM `order`") 
    res.json({
        result: data
    })

}

//============================ Get one order ===================================
const getOne_order = (req, res) => {
    var id = req.params.id
    var sql = "SELECT * FROM order WHERE order_id = ?"
    db.query(sql, [id], (err, row) => {
        if (err) {
            res.json({
                message: err,
                err: true
            })
        } else {
            res.json({
                result: row
            })
        }
    })
}

//============================== Get order by customer ============================
const getOrderByCustomer = async (req, res) => {
    const { customer_id } = req.body
    var data = await db.query("SELECT * FROM order WHERE customer_id = ?", [customer_id])
    res.json({
        result: data
    })
}
//================================================= Create Order ======================
const create_order = async (req, res) => {
    try {
        db.beginTransaction()
        const {
            customer_id,
            address_id,
            payement_methode_id,
        } = req.body
        var order_status_id = 1
        var invoice_no = "12243"
        var message = {}
        if (isEmptyOrNull(customer_id)) {message.customer_id = "customer_id required!"}
        if (isEmptyOrNull(address_id)) { message.address_id = "address_id required!" }
        if (isEmptyOrNull(payement_methode_id)) { message.payement_methode_id = "payement_methode_id required!" }
        if(Object.keys(message).length > 0){
            res.json({
                message: message,
                error :  true
            })
            return 0;
        }
        //========= find customer address info (client)
        var address = await db.query("SELECT * FROM customer_address WHERE customer_address_id = ?",[customer_id])
        if(address?.length > 0){
            const {firstname,lastname,tel,address_des} = address[0]
            //=========== find total order => need getcart info from customer 
            var Cart = await db.query("SELECT c.*, p.price FROM cart c INNER JOIN product p ON (c.product_id = p.product_id) WHERE c.customer_id = ?",[customer_id])
            //================ find total amount ======= 
            const order_total = 0
            Cart.map((item,index)=>{
                order_total += (item.quantity * item.price)
            })
            //============= Innsert data to table order
            var sqlOrder = "INSERT INTO order (customer_id,payement_methode_id,order_total,comment,firstname,lastname,telelphone,address_des) VALUES (?,?,?,?,?,?,?,?)"
            var sqlOrderParam = [customer_id,payement_methode_id,order_total,comment,firstname,lastname,tel,address_des]
            const dataOrder = db.query(sqlOrder,sqlOrderParam)
            //========= Insert to Order Detail
            Cart.map( async (item,index)=>{
                var sqlOrderDetail = db.query("INSERT INTO order_detail (order_id,product_id,quantity,price) VALUES (?,?,?,?)")
                var sqlOrderDetailParam = [dataOrder.insertId,item,product_id,item.quantity,item.price]
                const OrderDetail = await db.query( sqlOrderDetail,sqlOrderDetailParam)
            })
            res.json({
                message : "Order have been complete!",
                result : dataOrder
            })
        }
    } catch (e) {

        db.rollback();
    }
}

//====================================== Update Order =======================
const update_order = (req, res) => {

}

//=========================== Remove order =================================
const remove_order = (req, res) => {

}
module.exports = {
   // generateUnvoiceId,
    getAll_order,
    getOne_order,
    getOrderByCustomer,
    create_order,
    update_order,
    remove_order
}