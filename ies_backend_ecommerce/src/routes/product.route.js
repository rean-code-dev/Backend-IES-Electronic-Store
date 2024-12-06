const controller  =require("../controllers/product.controller")
const {upload} = require("../utils/service")
const Product = (app,base_route)=>{
    app.get(`${base_route}/getAll`,controller.getAll_product)
    app.get(`${base_route}/searchProduct`,controller.searchProduct)
    app.get(`${base_route}/searchByCategory`, controller.searchProductBycategory)
    app.get(`${base_route}/:id`,controller.getOne_product)
    app.post(base_route,upload.single("image"),controller.create_product)
    app.put(base_route,controller.update_product)
    app.delete(`${base_route}/:id`,controller.remove_product)
    app.post(`${base_route}/change_status`,controller.changeProductStatus_product)
    


}
module.exports = Product