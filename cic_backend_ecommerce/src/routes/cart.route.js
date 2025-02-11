const controller  =require("../controllers/cart.controller")

const Cart = (app,base_route)=>{
    app.get(base_route,controller.getCartByCustomer)
    app.post(base_route,controller.addToCart)
    app.delete(`${base_route}/:id`,controller.removeCart)
    app.put(`${base_route}`,controller.updatCart)


}
module.exports = Cart