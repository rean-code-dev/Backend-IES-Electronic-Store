const controller  =require("../controllers/wishlist.controller")

const WishList = (app,base_route)=>{
    app.get(base_route,controller.getAll_wishlist)
    app.post(base_route,controller.create_wishlist)
    app.delete(`${base_route}/:id`,controller.remove_wishlist)


}
module.exports = WishList