const controller  =require("../controllers/option_feedback.controller")
const {upload} = require("../utils/service")

const OptionFeedback = (app,base_route)=>{
    app.get(base_route,controller.getOptionFeedback)
    app.post(base_route,upload.single("image"),controller.create_OptionFeedback)
}
module.exports = OptionFeedback

