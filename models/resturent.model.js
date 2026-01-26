const db = require("../db/mysql")
async function getAllResturent(){
    try{
    const [data,fields] = await db.query(`SELECT * FROM restaurant`)
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err
    }

}

async function getByIdResturent(id){
    try{
    const [data,fields] = await db.query(`SELECT * FROM restaurant where RestaurantID = ${id}`)
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err
    }

}


async function InsertResturent(formdata){
    try{
        const results = []
        for(item of formdata){
            await db.query(`INSERT INTO restaurant (RestaurantID,
                RestaurantName,Address,Phone,
                IsActive,Created,Modified)	
                VALUES(?,?,?,?,?,NOW(),NOW())`,[
                    item.RestaurantID,
                    item.RestaurantName,
                    item.Address,
                    item.Phone,
                    item.IsActive,	
                ])
                results.push({
                    error:false,
                    message:"Inserted SuccesFully"
                })
        }
        return results
    }
    catch(err){
       console.error("ERROR:",err)
        throw err 
    }
}

async function UpdateResturent(formdata,id){
    try{
        const results = []
        for(item of formdata){
            const [data] = await db.query(`
                UPDATE restaurant
                SET 
                RestaurantName = ?,
                Address = ?,
                Phone = ?,
                IsActive = ?,
                Modified = NOW()
                where RestaurantID = ?`,[
                    item.RestaurantName,
                    item.Address,
                    item.Phone,
                    item.IsActive,
                    id
                ])
                if(data.affectedRows === 0){
            results.push({
                    RestaurantID: item.RestaurantID,
                    error: true,
                    message: "No rows were updated. Check RestaurantID or data."
            })

        }
        else{
            results.push({
                    RestaurantID: item.RestaurantID,
                    error: true,
                    message: "Resturent Updated"
            })
        }
        
        }
        return results
    }
    catch(err){
        console.error("ERROR:",err)
        throw err 
    }
}

async function DeleteResturent(id){
    try{
    const [data] = await db.query(`DELETE FROM restaurant WHERE RestaurantID = ${id}`)
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err 
    }
}

module.exports = {getAllResturent,getByIdResturent,InsertResturent,UpdateResturent,DeleteResturent}