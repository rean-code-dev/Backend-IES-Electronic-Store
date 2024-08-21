const controller  =require("../controllers/order_status.controller")

const Order_status = (app,base_route)=>{
    app.get(base_route,controller.getAll_orderStatus)



}
module.exports = Order_status