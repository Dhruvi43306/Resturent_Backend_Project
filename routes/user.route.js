const express = require("express")
const { GetAllUsers, GetByIdUsers, InsertedUsers, UpdatedUsers, DeletedUsers, registerUser, loginUser } = require("../services/user.service")
const userRouter = express.Router()
const authMiddlewear = require("../middlewear/authMiddlewear.auth")
//get all
userRouter.get("/",async(req,res)=>{
    const data = await GetAllUsers()
    res.send(data)
})


//get by id
userRouter.get("/:id",async(req,res)=>{
    const data = await GetByIdUsers(req.params.id)
    res.send(data)
})


//inserted
userRouter.post("/",async(req,res)=>{
    const data = await InsertedUsers(req.body)
    res.send(data)
})

//Register
userRouter.post('/register',async(req,res)=>{
    const formdata = Array.isArray(req.body) ? req.body[0] : req.body;

    const data = await registerUser(formdata)
  res.status(data.error ? 400 : 201).json(data);
})

//login
userRouter.post('/login',async(req,res)=>{
    const data = await loginUser(req.body)
  res.status(data.error ? 401 : 200).json(data);
})


//updated
userRouter.put("/:id",async(req,res)=>{
    const data = await UpdatedUsers(req.body,req.params.id)
    res.send(data)
})


//deleted
userRouter.delete("/:id",async(req,res)=>{
    const data = await DeletedUsers(req.params.id)
    res.send(data)
})

module.exports = userRouter