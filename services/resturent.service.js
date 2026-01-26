const { getAllResturent, getByIdResturent, InsertResturent, UpdateResturent, DeleteResturent } = require("../models/resturent.model");

async function GetAllResturentes(){
    const data = await getAllResturent()
    if(data){
        return{
            erroe:false,
            data,
            message:"All Resturent are SuccessFully Feached!"
        }
    }
    else{
        return{
            error:true,
            message:"All Resturent Not are SuccessFully Feached!"

        }
    }
}

async function GetByIdResturentes(id){
    const data = await getByIdResturent(id)
    if(data){
        return{
            erroe:false,
            data,
            message:"Resturent are SuccessFully Feached By Id!"
        }
    }
    else{
        return{
            error:true,
            message:"Resturent Not are SuccessFully Feached By Id!"

        }
    }
}

async function InsertedResturentes(formdata){
    const data = await InsertResturent(formdata)
    if(data){
        return{
            erroe:false,
            data,
            message:"All Resturent are SuccessFully Inserted!"
        }
    }
    else{
        return{
            error:true,
            message:"All Resturent Not are SuccessFully Inserted!"

        }
    }
}

async function UpdatedResturentes(formdata,id){
    const data = await UpdateResturent(formdata,id)
    if(data){
        return{
            erroe:false,
            data,
            message:"Resturent are SuccessFully Updated!"
        }
    }
    else{
        return{
            error:true,
            message:"Resturent Not are SuccessFully Updated!"

        }
    }
}

async function DeletedResturentes(id){
    const data = await DeleteResturent(id)
    if(data){
        return{
            erroe:false,
            data,
            message:"Resturent are SuccessFully Deleted!"
        }
    }
    else{
        return{
            error:true,
            message:"Resturent Not are SuccessFully Deleted!"

        }
    }
}

module.exports = {GetAllResturentes,GetByIdResturentes,InsertedResturentes,UpdatedResturentes,DeletedResturentes}