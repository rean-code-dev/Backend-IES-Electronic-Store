const controller  =require("../controllers/product.controller")
const Product = (app,base_route)=>{
    app.get(base_route,controller.getAll_product)

}
module.exports = Product