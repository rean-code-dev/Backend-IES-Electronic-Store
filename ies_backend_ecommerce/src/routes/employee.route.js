const { userGuard } = require("../controllers/auth.controller")
const controller  =require("../controllers/employee.controller")

const Employee = (app,base_route)=>{
    app.get(base_route,userGuard,controller.getAll_employee)
    app.get(`${base_route}/:id`,userGuard,controller.getOne_employee)
    app.post(base_route,userGuard,controller.create_employee)
    app.put(base_route,controller.update_employee)
    app.delete(`${base_route}/:id`,userGuard,controller.remove_employee)


}
module.exports = Employee