require('dotenv').config()
const express = require("express")
const userRouter = require('./routes/user.route')
const {authMiddlewear,authMiddlewearManager} = require('./middlewear/authMiddlewear.auth')
const ManagerRouter = require('./routes/manager.route')
const ResturentRouter = require('./routes/resturent.route')
const managerResturentRouter = require('./routes/managerResturent.route')
const MenuCategoryRouter = require('./routes/menuCatogry.route')
const menuItemRouter = require('./routes/menuitem.route')
const orderRouter = require('./routes/order.route')
const orderItemRouter = require('./routes/orderItem.route')

const app = express()
app.use(express.json())



app.use("/users",authMiddlewear,userRouter)
app.use("/manager",authMiddlewearManager,ManagerRouter)
app.use("/resturent",ResturentRouter)
app.use("/managerResturent",managerResturentRouter)
app.use("/menuCategory",MenuCategoryRouter)
app.use("/menuItem",menuItemRouter)
app.use("/order",orderRouter)
app.use("/orderItem",orderItemRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server started")})