
const controller = require("../controllers/customer.controller")
const Customer = (app, base_route) =>{
    app.get(base_route,controller.getAll_customer)
    app.get(`${base_route}/:id`,controller.getOne_customer)
    app.post(base_route,controller.create_customer)
    app.post(`${base_route}/auth/login`,controller.login)
    app.put(base_route,controller.update_customer)
    app.delete(`${base_route}/:id`,controller.remove_customer)


    app.get(`${base_route})_address`,controller.getList_address)

    
}
module.exports= Customer