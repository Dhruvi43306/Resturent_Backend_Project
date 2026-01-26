const { getByIdorederItem, InsertOrderItems, UpdateOrderItem, DeleteOrderItem, getAllorederItem } = require("../models/orderItem.model");

async function GetAllOrderItemes(){
    const data = await getAllorederItem()
     if(data){
        return{
            error:false,
            data,
            message:"All OredrItem are SuccesFully Feached!"
        }
    }
    else{
        return{
            error:true,
            message:"All OredrItem Not are SuccesFully Feached!"
        }
    }
}

async function GetByIdOrderItemes(id){
    const data = await getByIdorederItem(id)
     if(data){
        return{
            error:false,
            data,
            message:"OredrItem are SuccesFully Feached By Id!"
        }
    }
    else{
        return{
            error:true,
            message:"OredrItem Not are SuccesFully Feached By Id!"
        }
    }
}

async function InsertedOrderItemes(formdata){
    const data = await InsertOrderItems(formdata)
     if(data){
        return{
            error:false,
            data,
            message:"All OredrItem are SuccesFully Inserted!"
        }
    }
    else{
        return{
            error:true,
            message:"All OredrItem Not are SuccesFully Inserted!"
        }
    }
}

async function UpdatedOrderItemes(formdata,id){
    const data = await UpdateOrderItem(formdata,id)
     if(data){
        return{
            error:false,
            data,
            message:"OredrItem are SuccesFully Updated!"
        }
    }
    else{
        return{
            error:true,
            message:"OredrItem Not are SuccesFully Updated!"
        }
    }
}

async function DeletedOrderItemes(id){
    const data = await DeleteOrderItem(id)
     if(data){
        return{
            error:false,
            data,
            message:"OredrItem are SuccesFully Deleted!"
        }
    }
    else{
        return{
            error:true,
            message:"OredrItem Not are SuccesFully Deleted!"
        }
    }
}

module.exports = {GetAllOrderItemes,GetByIdOrderItemes,InsertedOrderItemes,UpdatedOrderItemes,DeletedOrderItemes}