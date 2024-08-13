const controller  =require("../controllers/employee.controller")

const Employee = (app,base_route)=>{
    app.get(base_route,controller.getAll_employee)
    app.post(base_route,controller.create_employee)
    app.put(base_route,controller.update_employee)
    app.delete(`${base_route}/:id`,controller.remove_employee)


}
module.exports = Employee