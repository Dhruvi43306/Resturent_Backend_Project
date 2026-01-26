const express = require("express")
const { GetAlloreders, Deletedoreders, Updatededoreders, Insertedoreders } = require("../services/order.service")
const orderRouter = express.Router()


//get all
orderRouter.get("/",async(req,res)=>{
    const data = await GetAlloreders()
    res.send(data)
})

//get by id
orderRouter.get("/",async(req,res)=>{
    const data = await GetAlloreders()
    res.send(data)
})


//inserted
orderRouter.post("/",async(req,res)=>{
    const data = await Insertedoreders(req.body)
    res.send(data)
})


//updated
orderRouter.put("/:id",async(req,res)=>{
    const data = await Updatededoreders(req.body,req.params.id)
    res.send(data)
})


//deleted
orderRouter.delete("/:id",async(req,res)=>{
    const data = await Deletedoreders(req.params.id)
    res.send(data)
})

module.exports = orderRouter