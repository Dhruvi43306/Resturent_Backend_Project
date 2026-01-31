const swaggerUi = require("swagger-ui-express");
const path = require("path");



const swaggerSpec = require("./docs/swagger");
// const swaggerSpec1 = require("./docs/api-reference");


require('dotenv').config()
const express = require("express")
const userRouter = require('./routes/user.route')
const {authMiddlewear} = require('./middlewear/authMiddlewear.auth')
const ResturentRouter = require('./routes/resturent.route')
const MenuCategoryRouter = require('./routes/menuCatogry.route')
const menuItemRouter = require('./routes/menuitem.route')
const orderRouter = require('./routes/order.route')
const orderItemRouter = require('./routes/orderItem.route');
const paymentRouter = require("./routes/payment.route");

const app = express()
app.use(express.json())


app.use(
  "/api-docs",
  swaggerUi.serveFiles(swaggerSpec),
  swaggerUi.setup(swaggerSpec,{
     swaggerOptions: {
      docExpansion: "none",
    },
  })
);

app.use("/docs", express.static(path.join(__dirname, "docs")));



app.use("/users",userRouter)
app.use(authMiddlewear)

app.use("/resturent",ResturentRouter)
app.use("/menuCategory",MenuCategoryRouter)
app.use("/menuItem",menuItemRouter)
app.use("/order",orderRouter)
app.use("/orderItem",orderItemRouter)
app.use("/payment",paymentRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server started")})