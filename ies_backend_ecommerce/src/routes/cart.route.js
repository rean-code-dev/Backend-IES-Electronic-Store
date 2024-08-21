const controller  =require("../controllers/wishlist.controller")

const Cart = (app,base_route)=>{
    app.get(base_route,controller.getCartByCustomer)
    app.post(base_route,controller.createCart)
    app.put(base_route,controller.updateCart)
    app.delete(`${base_route}/:id`,controller.removeCart)


}
module.exports = Cart