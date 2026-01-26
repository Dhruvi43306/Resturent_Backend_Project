const express = require("express")
const { GetAllResturentes, GetByIdResturentes, InsertedResturentes, UpdatedResturentes, DeletedResturentes } = require("../services/resturent.service")
const ResturentRouter = express.Router()


//get all
ResturentRouter.get("/",async(req,res)=>{
    const data = await GetAllResturentes()
    res.send(data)
})

//get by id
ResturentRouter.get("/:id",async(req,res)=>{
    const data = await GetByIdResturentes(req.params.id)
    res.send(data)
})


//insertde
ResturentRouter.post("/",async(req,res)=>{
    const data = await InsertedResturentes(req.body)
    res.send(data)
})


//updated
ResturentRouter.put("/:id",async(req,res)=>{
    const data = await UpdatedResturentes(req.body,req.params.id)
    res.send(data)
})


//deleted
ResturentRouter.delete("/:id",async(req,res)=>{
    const data = await DeletedResturentes(req.params.id)
    res.send(data)
})

module.exports = ResturentRouter