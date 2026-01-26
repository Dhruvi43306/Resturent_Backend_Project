const express = require("express")
const { GetAllManagerResturentes, GetByIdManagerResturentes, InsertedManagerResturentes, UpdatedManagerResturentes, DeletedManagerResturentes } = require("../services/managerResturent.service")
const managerResturentRouter = express.Router()

//get all
managerResturentRouter.get("/",async(req,res)=>{
    const data = await GetAllManagerResturentes()
    res.send(data)
})


//get by id
managerResturentRouter.get("/:id",async(req,res)=>{
    const data = await GetByIdManagerResturentes(req.params.id)
    res.send(data)
})


//insert
managerResturentRouter.post("/",async(req,res)=>{
    const data = await InsertedManagerResturentes(req.body)
    res.send(data)
})


//update
managerResturentRouter.put("/:id",async(req,res)=>{
    const data = await UpdatedManagerResturentes(req.body,req.params.id)
    res.send(data)
})


//delete
managerResturentRouter.delete("/:id",async(req,res)=>{
    const data = await DeletedManagerResturentes(req.params.id)
    res.send(data)
})

module.exports = managerResturentRouter