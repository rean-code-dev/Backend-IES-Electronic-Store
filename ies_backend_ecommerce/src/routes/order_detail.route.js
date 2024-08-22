const controller  =require("../controllers/order_detail.controller")

const OrderDetail = (app,base_route)=>{
    app.get(base_route,controller.getAll_orderDetail)
    // app.post(base_route,controller.create_wishlist)
    // app.delete(`${base_route}/:id`,controller.remove_wishlist)


}
module.exports = OrderDetail