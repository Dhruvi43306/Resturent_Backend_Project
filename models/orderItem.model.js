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
        const [data] = await db.query(`SELECT * FROM order_items where OrderItemID = ${id}`)
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
                `INSERT INTO order_items (OrderID, MenuItemID, Quantity, Price, Created)
                 VALUES (?, ?, ?, ?, NOW())`,
                [item.OrderID, item.MenuItemID, item.Quantity, item.Price]
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
            `UPDATE order_items oi
             JOIN orders o
              ON oi.OrderID = o.OrderID
             SET oi.Quantity = ?, oi.Price = ?
             WHERE oi.OrderItemID = ?`,
            [formData.Quantity, formData.Price, id]
        );
        return { error: false, message: "Updated Successfully", affectedRows: result.affectedRows };
    } catch (err) {
        console.error("UPDATE ERROR:", err);
        return { error: true, message: err.message };
    }
}

async function DeleteOrderItem(itemID) {
    try {
        const [result] = await db.query(
            `DELETE oi FROM orderitem oi
             JOIN \`order\` o ON oi.OrderID = o.OrderID
             WHERE oi.OrderItemID = ?`,
            [itemID]
        );
        return { error: false, message: "Deleted Successfully", affectedRows: result.affectedRows };
    } catch (err) {
        console.error("DELETE ERROR:", err);
        return { error: true, message: err.message };
    }
}

module.exports = {getAllorederItem,getByIdorederItem,InsertOrderItems,UpdateOrderItem,DeleteOrderItem}