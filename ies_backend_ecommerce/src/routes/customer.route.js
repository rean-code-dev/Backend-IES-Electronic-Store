
const controller = require("../controllers/customer.controller")
const Customer = (app, base_route) =>{
    app.Customer(base_route,controller.getAll_customer)
}
module.exports= Customer