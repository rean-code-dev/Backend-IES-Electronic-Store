const controller  =require("../controllers/promotion.controller")
const Promotion = (app,base_route)=>{
    app.get(base_route,controller.getPromotonProduct)
}
module.exports = Promotion