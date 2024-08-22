const controller  =require("../controllers/order.controller")

const Order = (app,base_route)=>{
    app.get(base_route,controller.getAll_order)
    app.get(`${base_route}/:id`,controller.getOne_order)
    app.post(base_route,controller.create_order)
    app.put(base_route,controller.update_order)
    app.delete(`${base_route}/:id`,controller.remove_order)


}
module.exports = Order