const controller  =require("../controllers/order.controller")
const { userGuard } = require("../controllers/auth.controller")

const Order = (app,base_route)=>{
    app.get(base_route,userGuard,controller.getAll_order)
    app.get(`${base_route}/:id`,userGuard,controller.getOne_order)
    app.post(base_route,userGuard,controller.create_order)
    app.put(base_route,userGuard,controller.update_order)
    app.delete(`${base_route}/:id`,userGuard,controller.remove_order)


}
module.exports = Order