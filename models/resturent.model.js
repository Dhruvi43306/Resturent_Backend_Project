const db = require("../db/mysql")
async function getAllResturent(){
    try{
    const [data,fields] = await db.query(`SELECT * FROM restaurant_tables`)
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err
    }

}

async function getByIdResturent(id){
    try{
    const [data,fields] = await db.query(`SELECT * FROM restaurant_tables where table_id = ${id}`)
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
            await db.query(`INSERT INTO restaurant_tables (table_id,
                table_number,capacity,status)	
                VALUES(?,?,?,?)`,[
                    item.table_id,
                    item.table_number,
                    item.capacity,
                    item.status,
                    	
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
       
            const [data] = await db.query(`
                UPDATE restaurant_tables
                SET 
                table_number = ?,
                capacity = ?,
                status = ?
                where table_id = ?`,[
                    
                    formdata.table_number,
                    formdata.capacity,
                    formdata.status,
                    id
                ])
                
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err 
    }
}

async function DeleteResturent(id){
    try{
    const [data] = await db.query(`DELETE FROM restaurant_tables WHERE table_id = ${id}`)
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err 
    }
}

module.exports = {getAllResturent,getByIdResturent,InsertResturent,UpdateResturent,DeleteResturent}