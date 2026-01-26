const { getAllManagerResturente, getByIdManagerResturente, InsertManagerResturent, UpdateManagerResturent, DeleteManagerRestaurantById } = require("../models/managerResturent.model");

async function GetAllManagerResturentes(){
    const data = await getAllManagerResturente()
    if(data){
        return{
            error:false,
            data,
            message:"All MaagerResturent are SucceFully Feached!"
        }
    }
    else{
        return{
            error:true,
            message:"All MaagerResturent Not are SucceFully Feached!"

        }
    }
}

async function GetByIdManagerResturentes(id){
    const data = await getByIdManagerResturente(id)
    if(data){
        return{
            error:false,
            data,
            message:"MaagerResturent are SucceFully Feached By Id!"
        }
    }
    else{
        return{
            error:true,
            message:"MaagerResturent Not are SucceFully Feached By Id!"

        }
    }
}

async function InsertedManagerResturentes(formdata){
    const data = await InsertManagerResturent(formdata)
    if(data){
        return{
            error:false,
            data,
            message:"All MaagerResturent are SucceFully Inserted!"
        }
    }
    else{
        return{
            error:true,
            message:"All MaagerResturent Not are SucceFully Inserted!"

        }
    }
}

async function UpdatedManagerResturentes(formdata,id){
    const data = await UpdateManagerResturent(formdata,id)
    if(data){
        return{
            error:false,
            data,
            message:"MaagerResturent are SucceFully Updated!"
        }
    }
    else{
        return{
            error:true,
            message:"MaagerResturent Not are SucceFully Updated!"

        }
    }
}

async function DeletedManagerResturentes(id){
    const data = await DeleteManagerRestaurantById(id)
    if(data){
        return{
            error:false,
            data,
            message:"MaagerResturent are SucceFully Deleted!"
        }
    }
    else{
        return{
            error:true,
            message:"MaagerResturent Not are SucceFully Deleted!"

        }
    }
}

module.exports = {GetAllManagerResturentes,GetByIdManagerResturentes,InsertedManagerResturentes,UpdatedManagerResturentes,DeletedManagerResturentes}