//put method nathi halti

const { getAllMenuItem, getByIdMenuItem, InsertMenuItem, UpdateMenuItem, DeleteMenuItem } = require("../models/menuitem.model");

async function GetAllMenuItemes(){
    const data = await getAllMenuItem()
    if(data){
        return{
            error:false,
            data,
            message:"All MenuItem are SuccesFully Feached"
        }
    }
    else{
       return{
            error:true,
            message:"All MenuItem Not are SuccesFully Feached"
        } 
    }
}

async function GetByIdMenuItemes(id){
    const data = await getByIdMenuItem(id)
    if(data){
        return{
            error:false,
            data,
            message:"MenuItem are SuccesFully Feached By Id"
        }
    }
    else{
       return{
            error:true,
            message:"MenuItem Not are SuccesFully Feached By Id"
        } 
    }
}

async function InsertedMenuItemes(formdata){
    const data = await InsertMenuItem(formdata)
    if(data){
        return{
            error:false,
            data,
            message:"All MenuItem are SuccesFully Inserted"
        }
    }
    else{
       return{
            error:true,
            message:"All MenuItem Not are SuccesFully Inserted"
        } 
    }
}

async function UpdatedMenuItemes(formdata,id){
    const data = await UpdateMenuItem(formdata,id)
    if(data){
        return{
            error:false,
            data,
            message:"MenuItem are SuccesFully Updated"
        }
    }
    else{
       return{
            error:true,
            message:"MenuItem Not are SuccesFully Updated"
        } 
    }
}

async function DeletedMenuItemes(id){
    const data = await DeleteMenuItem(id)
    if(data){
        return{
            error:false,
            data,
            message:"MenuItem are SuccesFully Deleted"
        }
    }
    else{
       return{
            error:true,
            message:"MenuItem Not are SuccesFully Deleted"
        } 
    }
}

module.exports = {GetAllMenuItemes,GetByIdMenuItemes,InsertedMenuItemes,UpdatedMenuItemes,DeletedMenuItemes}