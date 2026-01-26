const express = require("express")
const { GetAllMenuCategoryes, GetByIdMenuCategoryes, InsertedMenuCategoryes, UpdateMenuCategoryes, DeletedMenuCategoryes } = require("../services/menuCatogry.service")
const MenuCategoryRouter = express.Router()


//get all
MenuCategoryRouter.get("/",async(req,res)=>{
    const data = await GetAllMenuCategoryes()
    res.send(data)
})

//get By id
MenuCategoryRouter.get("/:id",async(req,res)=>{
    const data = await GetByIdMenuCategoryes(req.params.id)
    res.send(data)
})

//insertd
MenuCategoryRouter.post("/",async(req,res)=>{
    const data = await InsertedMenuCategoryes(req.body)
    res.send(data)
})


//updated
MenuCategoryRouter.put("/:id",async(req,res)=>{
    const data = await UpdateMenuCategoryes(req.body,req.params.id)
    res.send(data)
})


//deleted
MenuCategoryRouter.delete("/:id",async(req,res)=>{
    const data = await DeletedMenuCategoryes(req.params.id)
    res.send(data)
})

module.exports = MenuCategoryRouter