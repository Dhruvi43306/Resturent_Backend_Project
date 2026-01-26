const db = require("../db/mysql")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
async function getAllUser(){
    try{
    const [data,field] = await db.query(`SELECT * FROM users`)
        return data
    }
    catch(err){
        return false
    }
}

async function getByIdUser(id){
    try{
    const [data,field] = await db.query(`SELECT * FROM users where 	UserID=${id}`)
        return data
    }
    catch(err){
        return false
    }
}


async function InsertUser(formdata){
    try{
        const results = []
        for(item of formdata){
     await db.query(
    `INSERT INTO users(UserID, UserName, Email, Phone, Password, Role, 
    IsActive, Created, Modified) VALUES(?,?,?,?,?,?,?,NOW(),NOW())`
    ,[item.UserID,
      item.UserName,
      item.Email,
      item.Phone,
      item.Password,
      item.Role,
      item.IsActive
      
      
    ])
    results.push({
        UserID:item.UserID,
        error:false,
        message:"Inserted successfully"
      })
       
    }
    return results
}
    catch(err){
        console.error("ERROR ", err.sqlMessage || err.message)
        return false
    }
}

async function UpdateUser(formdata,id) {
    try {
        const results = [];

        for (const item of formdata) {
            const [data] = await db.query(
                `UPDATE users 
                 SET 
                    UserName = ?,
                    Email = ?,
                    Phone = ?,
                    Password = ?,
                    Role = ?,
                    IsActive = ?,
                    Modified = NOW()
                 WHERE UserID = ${id}`,
                [
                    
                    item.UserName,
                    item.Email,
                    item.Phone,
                    item.Password,
                    item.Role,
                    item.IsActive,
                    item.UserID
                ]
            );
            if(data.affectedRows === 0){
                results.push({
                UserID: item.UserID,
                affectedRows:data.affectedRows,
                error:true,
                message:"Record Not Found"
                })
                
            }
            else{
            results.push({
                UserID: item.UserID,
                affectedRows:data.affectedRows,
                error: false,
                message: "Updated successfully"
            });
        }
    }

        return results;
    } catch (err) {
        console.error("ERROR:", err.sqlMessage || err.message);
        return false;
    }
}



async function DeleteUser(id){
    try{
    const [data,fields] = await db.query(`DELETE FROM users WHERE UserID = ${id}`)
        return data
    }
    catch(err){
      console.error("ERROR:", err.sqlMessage || err.message);
        return false;  
    }
}

async function findUserByEmail(email){
    try{
        const [data] = await db.query('SELECT * FROM users WHERE Email = ?', [email])
        return data[0] || null;
    }
    catch(err){
        console.error("Error:",err.message)
        throw err
    }
}
async function createUser(formdata){
    try{
        const { UserName, Email, Phone, Password, Role, IsActive } = formdata;
        const hashPassword = await bcrypt.hash(Password,10)
    if (!Password) {
      throw new Error('Password is required');
    }
        const [data] = await db.query(  
    `INSERT INTO users (UserName, Email, Phone, Password, Role, IsActive, Created, Modified)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [UserName, Email, Phone, hashPassword, Role, IsActive])
    
    return{
        UserID:data.insertId
    }  
    }
    catch(err){
       console.error("Error:",err.message)
        throw err 
    }
}
module.exports = {getAllUser,getByIdUser,InsertUser,UpdateUser,DeleteUser,findUserByEmail,createUser}