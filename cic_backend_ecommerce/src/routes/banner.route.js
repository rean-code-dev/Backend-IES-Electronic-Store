const controller =  require("../controllers/banner.controller")

const Slider = (app,base_route) =>{
    app.get(base_route,controller.getAll_Slider)
    app.get(`${base_route}/:id`,controller.getOne_Slider)
    app.post(base_route,controller.create_Slider)
    app.put(base_route,controller.update_Slider)
    app.delete(`${base_route}/:id`,controller.remove_Slider)
}

module.exports = Slider