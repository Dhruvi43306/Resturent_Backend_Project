const { getAllMenuCategory, getByIdMenuCategory, InsertMenuCategory, UpdateMenuCategory, DeleteMenuCategory } = require("../models/menuCatogry.model");

async function GetAllMenuCategoryes(){
    const data = await getAllMenuCategory()
    if(data){
        return{
            error:false,
            data,
            message:"All Menu Category are SuccessFully Feached"
        }
    }
    else{
        return{
            error:true,
            message:"All Menu Category Not are SuccessFully Feached"

        }
    }
}

async function GetByIdMenuCategoryes(id){
    const data = await getByIdMenuCategory(id)
    if(data){
        return{
            error:false,
            data,
            message:"Menu Category are SuccessFully Feached By Id"
        }
    }
    else{
        return{
            error:true,
            message:"Menu Category Not are SuccessFully Feached By Id"

        }
    }
}

async function InsertedMenuCategoryes(formdata){
    const data = await InsertMenuCategory(formdata)
    if(data){
        return{
            error:false,
            data,
            message:"All Menu Category are SuccessFully Inserted"
        }
    }
    else{
        return{
            error:true,
            message:"All Menu Category Not are SuccessFully Inserted"

        }
    }
}

async function UpdateMenuCategoryes(formdata,id){
    const data = await UpdateMenuCategory(formdata,id)
    if(data){
        return{
            error:false,
            data,
            message:"Menu Category are SuccessFully Updated"
        }
    }
    else{
        return{
            error:true,
            message:"Menu Category Not are SuccessFully Updated"

        }
    }
}

async function DeletedMenuCategoryes(id){
    const data = await DeleteMenuCategory(id)
    if(data){
        return{
            error:false,
            data,
            message:"Menu Category are SuccessFully Deleted"
        }
    }
    else{
        return{
            error:true,
            message:"Menu Category Not are SuccessFully Deleted"

        }
    }
}

module.exports = {GetAllMenuCategoryes,GetByIdMenuCategoryes,InsertedMenuCategoryes,UpdateMenuCategoryes,DeletedMenuCategoryes}