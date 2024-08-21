const controller  =require("../controllers/product.controller")
const Product = (app,base_route)=>{
    app.get(base_route,controller.getAll_product)
    app.get(`${base_route}/:id`,controller.getOne_product)
    app.post(base_route,controller.create_product)
    app.put(base_route,controller.update_product)
    app.delete(`${base_route}/:id`,controller.remove_product)
    app.post(`${base_route}/change_status`,controller.changeProductStatus_product)


}
module.exports = Product