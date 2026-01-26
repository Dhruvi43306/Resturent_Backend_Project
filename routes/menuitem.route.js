const express = require("express")
const { GetAllMenuItemes, GetByIdMenuItemes, InsertedMenuItemes, UpdatedMenuItemes, DeletedMenuItemes } = require("../services/menuitem.service")
const menuItemRouter = express.Router()


//get all
menuItemRouter.get("/",async(req,res)=>{
    const data = await GetAllMenuItemes()
    res.send(data)
})

//get by id
menuItemRouter.get("/:id",async(req,res)=>{
    const data = await GetByIdMenuItemes(req.params.id)
    res.send(data)
})

//insertd
menuItemRouter.post("/",async(req,res)=>{
    const data = await InsertedMenuItemes(req.body)
    res.send(data)
})

//updated
menuItemRouter.put("/:id",async(req,res)=>{
    const [item] = req.body
    const data = await UpdatedMenuItemes(item,req.params.id)
    res.send(data)
})


//deletde
menuItemRouter.delete("/:id",async(req,res)=>{
    const data = await DeletedMenuItemes(req.params.id)
    res.send(data)
})

module.exports= menuItemRouter