const controller  =require("../controllers/wishlist.controller")

const WishList = (app,base_route)=>{
    app.get(base_route,controller.getFavorite)
    app.post(base_route,controller.createFavorite)
    app.delete(`${base_route}/:id`,controller.remove_wishlist)


}
module.exports = WishList