const { getAllPayment, getByIdPayment, InsertPayment, UpdatePayment, DeletePayment } = require("../models/payment.model");

async function GetAllPayment(){
    const data = await getAllPayment()
    if(data){
        return{
            error:false,
            data,
            message:"Payment are not SuccesFully Feached!"
        }
    }
    else{
       return{
            error:false,
            data,
            message:"Payment are SuccesFully Feached!"
        } 
    }
}

async function GetByIdPayment(id){
    const data = await getByIdPayment(id)
    if(data){
        return{
            error:false,
            data,
            message:"Payment are not SuccesFully Feached By Id!"
        }
    }
    else{
       return{
            error:false,
            data,
            message:"Payment are SuccesFully Feached By Id!"
        } 
    }
}

async function InsertedPayment(formdata){
    const data = await InsertPayment(formdata)
    if(data){
        return{
            error:false,
            data,
            message:"Payment are not SuccesFully Inserted!"
        }
    }
    else{
       return{
            error:false,
            data,
            message:"Payment are SuccesFully Inserted!"
        } 
    }
}

async function UpdatedPayment(formdata,id){
    const data = await UpdatePayment(formdata,id)
    if(data){
        return{
            error:false,
            data,
            message:"Payment are not SuccesFully Updated!"
        }
    }
    else{
       return{
            error:false,
            data,
            message:"Payment are SuccesFully Updated!"
        } 
    }
}

async function DeletedPayment(id){
    const data = await DeletePayment(id)
    if(data){
        return{
            error:false,
            data,
            message:"Payment are not SuccesFully Deleetd!"
        }
    }
    else{
       return{
            error:false,
            data,
            message:"Payment are SuccesFully Deleetd!"
        } 
    }
}

module.exports = {GetAllPayment,GetByIdPayment,InsertedPayment,UpdatedPayment,DeletedPayment}