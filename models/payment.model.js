const db = require("../db/mysql")
async function getAllPayment(){
    try{
    const [data] = await db.query(`SELECT * FROM payments`)
        return data
    }
    catch(err){
        console.error("Error:",err)
        throw err
    }
}

async function getByIdPayment(id){
    try{
    const [data] = await db.query(`SELECT * FROM payments where payment_id = ?`,[id])
        return data
    }
    catch(err){
        console.error("Error:",err)
        throw err
    }
}

async function InsertPayment(formdata){
    try{
        const results = []
        for(item of formdata){
            await db.query(`insert into payments (order_id,cashier_id,payment_method
                ,amount,payment_status,created_at) values(?,?,?,?,?,NOW())`,[
                    item.order_id,
                    item.cashier_id,
                    item.payment_method,
                    item.amount,
                    item.payment_status
                ])
                results.push({
                error: false,
                message: "Inserted Successfully",
            })
        }
        return results
    }
    catch(err){
        console.error("Error:",err)
        throw err
    }
}


async function UpdatePayment(formdata,id){
    try{
        
            await db.query(`
                UPDATE payments 
                SET 
                payment_method = ?,
                amount = ?,
                payment_status = ?
                where payment_id = ?`,[
                    
                    
                    formdata.payment_method,
                    formdata.amount,
                    formdata.payment_status,
                    [id]
                ])

        return{
             error: false,
            message: "Updated Successfully",
        }
    }
    catch(err){
        console.error("Error:",err)
        throw err
    }
}

async function DeletePayment(id){
    try{
    const [data] = await db.query(`DELETE  FROM payments where payment_id = ?,`,[id])
        return data
    }
    catch(err){
        console.error("Error:",err)
        throw err
    }
}

module.exports = {getAllPayment,getByIdPayment,InsertPayment,DeletePayment,UpdatePayment}