const controller  =require("../controllers/payment_methode.controller")

const Payment_methode = (app,base_route)=>{
    app.get(base_route,controller.getAll_payment_methode)
    app.post(base_route,controller.create_payment_methode)
    app.delete(`${base_route}/:id`,controller.remove_payment_methode)


}
module.exports = Payment_methode