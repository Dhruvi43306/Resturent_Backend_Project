const db = require("../db/mysql")

//put ma update kriye ne to 0 thi jay che
async function getAllorederItem(){
    try{
        const [data] = await db.query(`SELECT * FROM order_items`)
        return data
    }
    catch(err){
        console.error("Error:",err)
        throw err
    }
}

async function getByIdorederItem(id){
    try{
        const [data] = await db.query(`SELECT * FROM order_items where order_item_id = ${id}`)
        return data
    }
    catch(err){
        console.error("Error:",err)
        throw err
    }
}

async function InsertOrderItems(formData) {
    try {
        const results = [];
        for (const item of formData) {
            await db.query(
                `INSERT INTO order_items (order_id, item_id,quantity,price)
                 VALUES (?, ?, ?, ?)`,
                [item.order_id, item.item_id, item.	quantity, item.price]
            );
            results.push({
                error: false,
                message: "Inserted Successfully",
            });
        }
        return results;
    } catch (err) {
        console.error("INSERT ERROR:", err);
        return { error: true, message: err.message };
    }
}

async function UpdateOrderItem(formData,id) {
    try {
        const [result] = await db.query(
            `UPDATE order_items 
             SET quantity = ?, price = ?
             WHERE order_item_id = ?`,
            [formData.quantity, formData.price, id]
        );
        return { error: false, message: "Updated Successfully", affectedRows: result.affectedRows };
    } catch (err) {
        console.error("UPDATE ERROR:", err);
        return { error: true, message: err.message };
    }
}

async function DeleteOrderItem(id) {
    try {
        const [result] = await db.query(
            `DELETE  FROM order_items 
             
             WHERE order_item_id = ?`,
            [id]
        );
        return { error: false, message: "Deleted Successfully", affectedRows: result.affectedRows };
    } catch (err) {
        console.error("DELETE ERROR:", err);
        return { error: true, message: err.message };
    }
}

module.exports = {getAllorederItem,getByIdorederItem,InsertOrderItems,UpdateOrderItem,DeleteOrderItem}