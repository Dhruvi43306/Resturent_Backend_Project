const db = require("../db/mysql")
const bcrypt = require("bcrypt")
async function getAllManager(){
    try{
        const [data] = await db.query(`SELECT * FROM manager`)
        return data
    }
catch(err){
    console.error("ERROR:",err)
    return false
}
}

async function getByIdManager(id){
    try{
        const [data] = await db.query(`SELECT * FROM manager where ManagerID = ${id}`)
        return data
    }
catch(err){
    console.error("ERROR:",err)
    return false
}
}


async function InsertManager(formdata){
    try{
        const results = []
        for(item of formdata){
        await db.query(
        `INSERT INTO manager(ManagerID, ManagerName, Email,
        Phone, Password, IsActive, Created, Modified) VALUES(?,?,?,?,?,?,NOW(),NOW())`,
    [
    item.ManagerID,
     item.ManagerName,
     item.Email,
     item.Phone,
     item.Password,
     item.IsActive,   
    ])
        results.push({
            ManagerID: item.ManagerID,
            error:false,
            message:"Inserted SuccesFully"
        })
    }
    return results
}
catch(err){
    console.error("ERROR:",err)
    return false
}
}

async function UpdateManager(formdata,id) {
    try {
        const dataArr = Array.isArray(formdata) ? formdata : [formdata];

        const results = [];

        for (const item of dataArr) {
            console.log("Full item object:", item);
          console.log(item.ManagerID)

          const [data] =  await db.query(
                `UPDATE manager
                 SET 
                    ManagerName = ?,
                    Email = ?,
                    Phone = ?,
                    Password = ?,
                    IsActive = ?,
                    Modified = NOW()
                 WHERE ManagerID = ?`,
                [
                    item.ManagerName,
                    item.Email,
                    item.Phone,
                    item.Password,
                    item.IsActive,
                    id
                ]
            );
           if (data.affectedRows === 0) {
             results.push({
                    ManagerID: item.ManagerID,
                    error: true,
                    message: "No rows were updated. Check ManagerID or data."
                });
                
            } else {
               results.push({
                    ManagerID: item.ManagerID,
                    error: false,
                    message: "Updated Successfully"
                });
            }
        }

        return results;
    } catch (err) {
        console.error("MYSQL ERROR:", err.sqlMessage || err.message);
        return false;
    }
}

async function DeleteManager(id){
    try{
        const [data,field] = await db.query(`DELETE FROM manager WHERE ManagerID = ${id}`)
        return data
    }
    catch(err){
      console.error("MYSQL ERROR:", err.sqlMessage || err.message);
        return false;  
    }
}
async function findByMangerEmail(email){
    try{
        const[data,field] = await db.query(`SELECT * FROM manager where Email = ?`,[email])
        return data
    }catch(err){
        console.error("MYSQL ERROR:", err.sqlMessage || err.message);
        return false;  
    }
}

async function createManager(formdata){
    try{
        const {ManagerID, ManagerName, Email,Phone, Password,IsActive} = formdata
        const hashPassword = await bcrypt.hash(Password,10)
        if(!Password){
            throw new Error('Password is required');
        }
        const [data,fields] = await db.query(`INSERT INTO manager(ManagerID, ManagerName, Email,
        Phone, Password,IsActive) VALUES(?,?,?,?,?,?)`,
    [ManagerID,ManagerName,Email,Phone,hashPassword,IsActive])
    return{
        ManagerID:data.insertId
    }  
    }
    catch(err){
        console.error("MYSQL ERROR:", err.sqlMessage || err.message);
        return false;
    }
}
module.exports = {getAllManager,getByIdManager,InsertManager,UpdateManager,DeleteManager,findByMangerEmail,createManager}