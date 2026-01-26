const { getAlloreder, getByIdoreder, InsertOrder, UpdateOrder, DeleteOrder } = require("../models/order.model");

async function GetAlloreders(){
    const data = await getAlloreder()
    if(data){
        return{
            error:false,
            data,
            message:"All Oredr are SuccesFully Feached!"
        }
    }
    else{
        return{
            error:true,
            message:"All Oredr Not are SuccesFully Feached!"
        }
    }
}

async function GetByIdoreders(id){
    const data = await getByIdoreder(id)
    if(data){
        return{
            error:false,
            data,
            message:"Oredr are SuccesFully Feached By Id!"
        }
    }
    else{
        return{
            error:true,
            message:"Oredr Not are SuccesFully Feached By Id!"
        }
    }
}

async function Insertedoreders(formdata){
    const data = await InsertOrder(formdata)
    if(data){
        return{
            error:false,
            data,
            message:"All Oredr are SuccesFully Inserted!"
        }
    }
    else{
        return{
            error:true,
            message:"All Oredr Not are SuccesFully Inserted!"
        }
    }
}

async function Updatededoreders(formdata,id){
    const data = await UpdateOrder(formdata,id)
    if(data){
        return{
            error:false,
            data,
            message:"Oredr are SuccesFully Updated!"
        }
    }
    else{
        return{
            error:true,
            message:"Oredr Not are SuccesFully Updated!"
        }
    }
}

async function Deletedoreders(id){
    const data = await DeleteOrder(id)
    if(data){
        return{
            error:false,
            data,
            message:"Oredr are SuccesFully Deleted!"
        }
    }
    else{
        return{
            error:true,
            message:"Oredr Not are SuccesFully Deleted!"
        }
    }
}

module.exports = {GetAlloreders,GetByIdoreders,Insertedoreders,Updatededoreders,Deletedoreders}