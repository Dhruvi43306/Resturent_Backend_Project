const { getAllManager, getByIdManager, InsertManager, UpdateManager, DeleteManager, findByMangerEmail, createManager } = require("../models/manager.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
async function GetAllManageres(){
    const data = await getAllManager()
    if(data){
        return{
            error:false,
            data,
            message:"All Manager are SuccessFully Feached!"
        }
    }
    else{
        return{
            error:true,
            message:"All Manager Not are SuccessFully Feached!"
        }
    }
}


async function GetByIdManageres(id){
    const data = await getByIdManager(id)
    if(data){
        return{
            error:false,
            data,
            message:"Manager are SuccessFully Feached By Id!"
        }
    }
    else{
        return{
            error:true,
            message:"Manager Not are SuccessFully Feached By Id!"
        }
    }
}

async function InsertedManageres(formdata){
    const data = await InsertManager(formdata)
    if(data){
        return{
            error:false,
            data,
            message:"All Manager are SuccessFully Inserted!"
        }
    }
    else{
        return{
            error:true,
            message:"All Manager Not are SuccessFully Inserted!"
        }
    }
}

async function UpdatedManageres(formdata,id){
    const data = await UpdateManager(formdata,id)
    if(data){
        return{
            error:false,
            data,
            message:"Manager are SuccessFully Updated!"
        }
    }
    else{
        return{
            error:true,
            message:"All Manager Not are SuccessFully Updated!"
        }
    }
}

async function DeletedManageres(id){
    const data = await DeleteManager(id)
    if(data){
        return{
            error:false,
            data,
            message:"Manager are SuccessFully Deleted!"
        }
    }
    else{
        return{
            error:true,
            message:"Manager Not are SuccessFully Deleted!"
        }
    }
}

async function CheckRegister(formdata){
    try{
    const exitEmail = await findByMangerEmail(formdata.Email)
    if(exitEmail.length > 0){
        return{
            message:"Email already Exists"
        }
    }
    const manager = await createManager(formdata)
    if(manager){
        return{
            error:false,
            message:"Manager registred sucessFully",
            ManagerID:manager.ManagerID
        }
    }
}catch(err){
    console.error("Register Error:",err)
        return{
            error:true,
            message:"Internal server Error"
        }
    }
}

async function CheckLogin({Email,Password}){
    try{
    const [manager] = await findByMangerEmail(Email)
    if(!manager){
            return{
                error:true,
                message:"Manager not found"
            }
        }
    const ismatch =  await bcrypt.compare(Password,manager.Password)
    if(!ismatch){
        return { error: true, message: 'Invalid password' };
    }
     const token = jwt.sign({ManagerID: manager.ManagerID,Email: manager.Email,Role: manager.Role},
        'shhhhh',
        { expiresIn: '1h' }
      );
        return {
            error: false,
            message: 'Login successful',
            token
      };   
}catch(err){
    console.error("Login Error:",err.message)
        return{
            error:true,
            message:"Internal Server Error"
        }
}
}

module.exports = {GetAllManageres,GetByIdManageres,InsertedManageres,UpdatedManageres,DeletedManageres,CheckRegister,CheckLogin}