const { getAllUser, getByIdUser, InsertUser, UpdateUser, DeleteUser, findUserByEmail, createUser } = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
async function GetAllUsers(){
    const data = await getAllUser()
    if(data){
        return{
            error:false,
            data,
            message:"All Users are SuccesFully Feached!"
        }
    }
    else{
        return{
            error:true,
            message:"All Users are Not SuccesFully Feached!"
        }
    }
}


async function GetByIdUsers(id){
    const data = await getByIdUser(id)
    if(data){
        return{
            error:false,
            data,
            message:"User are SuccesFully Feached By Id!"
        }
    }
    else{
        return{
            error:true,
            message:"User are Not SuccesFully Feached By Id!"
        }
    }
}

async function InsertedUsers(formdata){
    const data = await InsertUser(formdata)
    if(data){
        return{
            error:false,
            data,
            message:"All Users are SuccesFully Inserted!"
        }
    }
    else{
        return{
            error:true,
            message:"All Users are Not SuccesFully Inserted!"
        }
    }
}

async function UpdatedUsers(formdata,id){
    const data = await UpdateUser(formdata,id)
    if(data){
        return{
            error:false,
            data,
            message:"User are SuccesFully Updated!"
        }
    }
    else{
        return{
            error:true,
            message:"User are Not SuccesFully Updated!"
        }
    }
}

async function DeletedUsers(id){
    const data = await DeleteUser(id)
    if(data){
        return{
            error:false,
            data:data.data,
            message:"User are SuccesFully Deleted!"
        }
    }
    else{
        return{
            error:true,
            message:"User are Not SuccesFully Deleted!"
        }
    }
}
async function registerUser(formdata){
    try{
        if (!formdata.Password || !formdata.Email) {
      return {
        error: true,
        message: 'Email and Password are required'
      };
    }
        const existingUser = await findUserByEmail(formdata.Email)
        if(existingUser){
            return{
                error:true,
                message:"Email already Registread"
            }
        }
        const user = await createUser(formdata)
        return{
            error:false,
            message:"User registred sucessFully",
            UserID:user.UserID
        }
    }
    catch(err){
        console.error("Register Error:",err)
        return{
            error:true,
            message:"Internal server Error"
        }
    }
}


async function loginUser({Email,Password}){
    try{
        const user = await findUserByEmail(Email)
        if(!user){
            return{
                error:true,
                message:"User not found"
            }
        }
        const ismatch = await bcrypt.compare(Password,user.Password)
       if (!ismatch) {
    return { error: true, message: 'Invalid password' };
  }
    const token = jwt.sign({UserID: user.UserID,Email: user.Email,Role: user.Role},
    'shhhhh',
    { expiresIn: '1h' }
  );
    return {
        error: false,
        message: 'Login successful',
        token
  };
    }
    catch(err){
        console.error("Login Error:",err.message)
        return{
            error:true,
            message:"Internal Server Error"
        }
    }
}
module.exports = {GetAllUsers,GetByIdUsers,InsertedUsers,UpdatedUsers,DeletedUsers,registerUser,loginUser}