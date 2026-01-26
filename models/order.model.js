const db = require("../db/mysql")

async function getAlloreder(){
    try{
    const [data] = await db.query(`SELECT * FROM orders`)
    return data
    }
    catch(err){
        console.error(err)
        throw err
    }
}

async function getByIdoreder(id){
    try{
    const [data] = await db.query(`SELECT * FROM orders where OrderID = ${id}`)
    return data
    }
    catch(err){
        console.error(err)
        throw err
    }
}

async function InsertOrder(formdata) {
  try {
    const results = []
   for(item of formdata){

    const [data] = await db.query(
      `INSERT INTO orders
       (UserID, ManagerID, OrderNumber, TotalAmount, OrderStatus)
       VALUES (?, ?, ?, ?, ?)`,
      [
        item.UserID,
        item.ManagerID,
        item.OrderNumber ?? null,
        item.TotalAmount ?? 0,
        item.OrderStatus ?? "Pending"
      ]
    );

     results.push({
      error: false,
      message: "Order created successfully",
      OrderID: data.insertId
    });
    return results
  } 
}catch (err) {
    console.error("ERROR:", err);
    throw err;
  }
}


async function UpdateOrder(formdata, id) {
  try {
    const [check] = await db.query(
      `SELECT o.OrderID
       FROM orders o
       JOIN manager m ON m.ManagerID = o.ManagerID
       WHERE o.OrderID = ? AND m.ManagerID = ?`,
      [id, formdata.ManagerID]
    );

    if (check.length === 0) {
      return {
        error: true,
        message: "Order not found or manager not authorized"
      };
    }

    const [data] = await db.query(
      `UPDATE orders
       SET
         OrderStatus = ?,
         TotalAmount = ?
       WHERE OrderID = ?`,
      [
        formdata.OrderStatus,
        formdata.TotalAmount,
        id
      ]
    );

    return {
      error: false,
      message: "Order updated successfully"
    };
  } catch (err) {
    console.error("ERROR:", err);
    throw err;
  }
}
async function DeleteOrder(orderId, managerId) {
  try {
    const [data] = await db.query(
      `DELETE o
       FROM orders o
       JOIN manager m ON m.ManagerID = o.ManagerID
       WHERE o.OrderID = ? AND m.ManagerID = ?`,
      [orderId, managerId]
    );

    if (data.affectedRows === 0) {
      return {
        error: true,
        message: "Order not found or manager not authorized"
      };
    }

    return {
      error: false,
      message: "Order deleted successfully"
    };
  } catch (err) {
    console.error("ERROR:", err);
    throw err;
  }
}
module.exports = {getAlloreder,getByIdoreder,InsertOrder,UpdateOrder,DeleteOrder}