const controller  =require("../controllers/order_status.controller")

const Order_status = (app,base_route)=>{
    app.get(base_route,controller.getAll_orderStatus)
    app.post(base_route,controller.create_orderStatus)
    app.delete(`${base_route}/:id`,controller.remove_orderStatus)

}
module.exports = Order_status