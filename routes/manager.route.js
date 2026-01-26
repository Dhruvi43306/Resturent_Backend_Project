const express = require("express")
const { GetAllManageres, GetByIdManageres, InsertedManageres, UpdatedManageres, DeletedManageres, CheckRegister, CheckLogin } = require("../services/manager.service")
const ManagerRouter = express.Router()


//get all
ManagerRouter.get("/",async(req,res)=>{
    const data = await GetAllManageres()
    res.send(data)
})


//get by id
ManagerRouter.get("/:id",async(req,res)=>{
    const data = await GetByIdManageres(req.params.id)
    res.send(data)
})


//insert
ManagerRouter.post("/",async(req,res)=>{
    const data = await InsertedManageres(req.body)
    res.send(data)
})

//register
ManagerRouter.post("/register",async(req,res)=>{
    const formdata = Array.isArray(req.body) ? req.body[0] : req.body;
    const data = await CheckRegister(formdata)
    res.status(data.error ? 400 : 201).json(data);

})


//login
ManagerRouter.post("/login",async(req,res)=>{
    const data = await CheckLogin(req.body)
      res.status(data.error ? 400 : 201).json(data);

})

//update
ManagerRouter.put("/:id",async(req,res)=>{
    const data = await UpdatedManageres(req.body,req.params.id)
    res.send(data)
})


//delete
ManagerRouter.delete("/:id",async(req,res)=>{
    const data = await DeletedManageres(req.params.id)
    res.send(data)
})

module.exports = ManagerRouter