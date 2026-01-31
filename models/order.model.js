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
    const [data] = await db.query(`SELECT * FROM orders where order_id = ${id}`)
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
       (customer_id, waiter_id,total_amount, status)
       VALUES (?, ?, ?, ?)`,
      [
        
        item.customer_id,
        item.waiter_id ?? null,
        item.total_amount ?? 0,
        item.status ?? "Pending"
      ]
    );

     results.push({
      error: false,
      message: "Order created successfully"
    });
  } 
    return results

}catch (err) {
    console.error("ERROR:", err);
    throw err;
  }
}

async function UpdateOrder(formdata, id) {
  try {
    
    await db.query(
    `UPDATE orders
       SET customer_id = ?, waiter_id = ?, total_amount = ?, status = ?
       WHERE order_id = ?`,
      [
        formdata.customer_id,
        formdata.waiter_id,
        formdata.total_amount,
        formdata.status,
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
async function DeleteOrder(id) {
  try {
    const [data] = await db.query(
      `DELETE FROM orders 
       WHERE order_id = ?`,
      [id]
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