const express = require("express")
const { GetAllOrderItemes, GetByIdOrderItemes, UpdatedOrderItemes, DeletedOrderItemes } = require("../services/orderItem.service")
const { InsertOrderItems } = require("../models/orderItem.model")
const orderItemRouter =  express.Router()


//get all
orderItemRouter.get("/",async(req,res)=>{
    const data = await GetAllOrderItemes()
    res.send(data)
})

//get by id
orderItemRouter.get("/:id",async(req,res)=>{
    const data = await GetByIdOrderItemes(req.params.id)
    res.send(data)
})


//insertd
orderItemRouter.post("/",async(req,res)=>{
    const data = await InsertOrderItems(req.body)
    res.send(data)
})


//updated

orderItemRouter.put("/:id",async(req,res)=>{
    const [item] = req.body
    const data = await UpdatedOrderItemes(item,req.params.id)
    res.send(data)
})


//deleted
orderItemRouter.delete("/:id",async(req,res)=>{
    const data = await DeletedOrderItemes(req.params.id)
    res.send(data)
})

module.exports = orderItemRouter