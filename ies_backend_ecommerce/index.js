const express = require("express")
const app = express()
const cors =require("cors")

//======= Allow fronted access api ======== 
app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.get("/",(req,res)=>{res.send("Hello kon papa")})




const Category = require("./src/routes/category.route")
const Employee = require("./src/routes/employee.route")
const WishList =  require("./src/routes/wishlist.route")
const Payment_methode = require("./src/routes/payment_methode.route")
const Product = require("./src/routes/product.route")
const Cart = require("./src/routes/cart.route")
const OrderDetail = require("./src/routes/order_detail.route")
const Order = require("./src/routes/order.route")
const Slider = require("./src/routes/carousel_slider.route")


Product(app,"/api/product")
Category(app,"/api/category")
Employee(app,"/api/employee")
WishList(app,"/api/wishlist")
Payment_methode(app,"/api/payment_menthode")
Cart(app,"/api/cart")
Order(app,"/api/order")
Slider(app,"/api/slider")
OrderDetail(app,"/api/order_detail")




app.listen(8081,()=>{  //define 8081 for application
    console.log("Server run http://localhost:8081")
})
