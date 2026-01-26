const db = require("../db/mysql")
async function getAllManagerResturente(){
    try{
    const [data] = await db.query(`SELECT * FROM manager_restaurant`)
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err
    }

}

async function getByIdManagerResturente(id){
    try{
    const [data] = await db.query(`SELECT * FROM manager_restaurant where ManagerRestaurantID = ${id}`)
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err
    }

}

async function InsertManagerResturent(formdata){
    try{
        const results = []
        for(item of formdata){
            await db.query(
        `INSERT INTO manager_restaurant
        (ManagerID, RestaurantID, IsOwner, CanManageMenu, CanManageOrders, CanManageStaff, CanManageSettings)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          item.ManagerID,
          item.RestaurantID,
          item.IsOwner ?? 0,
          item.CanManageMenu ?? 1,
          item.CanManageOrders ?? 1,
          item.CanManageStaff ?? 1,
          item.CanManageSettings ?? 1
        ]
      );

      results.push({
        error: false,
        message: "Manager-Restaurant mapping inserted successfully"
      });
        }
        return results
    }
    catch(err){
        console.error("ERROR:",err)
        throw err
    }
}


async function checkManagerExists(managerId) {
  const [rows] = await db.query(
    `SELECT ManagerID FROM manager 
     WHERE ManagerID = ? AND IsActive = 1`,
    [managerId]
  );
  return rows.length > 0;
}

async function checkRestaurantExists(restaurantId) {
  const [rows] = await db.query(
    `SELECT RestaurantID FROM restaurant 
     WHERE RestaurantID = ? AND IsActive = 1`,
    [restaurantId]
  );
  return rows.length > 0;
}

async function UpdateManagerResturent(formdata,id){
    try{
        const managerExits = await checkManagerExists(formdata.ManagerID)
        if(!managerExits){
           return {
                error: true,
                message: "Manager not found or inactive"
      };  
        }
        const resturentExits = await checkRestaurantExists(formdata.RestaurantID)
        if(!resturentExits){
            return {
                error: true,
                message: "Restaurant not found or inactive"
      };
        }
        const [data] = await db.query(
         `UPDATE manager_restaurant mr
       JOIN manager m ON m.ManagerID = mr.ManagerID
       JOIN restaurant r ON r.RestaurantID = mr.RestaurantID
       SET
         mr.IsOwner = ?,
         mr.CanManageMenu = ?,
         mr.CanManageOrders = ?,
         mr.CanManageStaff = ?,
         mr.CanManageSettings = ?
       WHERE
         ManagerRestaurantID = ?,
         AND m.IsActive = 1
         AND r.IsActive = 1`,
      [
        formdata.IsOwner ?? 0,
        formdata.CanManageMenu ?? 1,
        formdata.CanManageOrders ?? 1,
        formdata.CanManageStaff ?? 1,
        formdata.CanManageSettings ?? 1,
        id
      ]
    );

    if (data.affectedRows === 0) {
      return {
        error: true,
        message: "No matching manager_restaurant record found"
      };
    }
     return {
      error: false,
      message: "Manager-Restaurant permissions updated successfully"
    };   
        
    }
    catch(err){
        console.error("SAFE UPDATE ERROR:", err);
        throw err;
    }
}

async function DeleteManagerRestaurantById(id) {
    try{
  const [data] = await db.query(
    `DELETE mr
     FROM manager_restaurant mr
     JOIN manager m ON m.ManagerID = mr.ManagerID
     JOIN restaurant r ON r.RestaurantID = mr.RestaurantID
     WHERE mr.ManagerRestaurantID = ?`,
    [id]
  );

  return data;
}
catch(err){
     console.error("SAFE UPDATE ERROR:", err);
    throw err;
}
}

module.exports = {getAllManagerResturente,getByIdManagerResturente,InsertManagerResturent,UpdateManagerResturent,DeleteManagerRestaurantById}
