const db  = require("../db/mysql")

async function getAllMenuItem(){
    try{
    const [data] = await db.query(`SELECT * FROM menu_item`)
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err
    }

}

async function getByIdMenuItem(id){
    try{
    const [data] = await db.query(`SELECT * FROM menu_item where MenuItemID =${id}`)
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err
    }

}

async function InsertMenuItem(formdata){
    try{
        const results = []
        for(item of formdata){
            await db.query(
      `INSERT INTO menu_item
      (
        ManagerID,
        MenuCategoryID,
        ItemName,
        Description,
        Price,
        IsAvailable
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        item.ManagerID,
        item.MenuCategoryID,
        item.ItemName,
        item.Description ?? null,
        item.Price,
        item.IsAvailable ?? 1
      ])
      results.push({
        error: false,
        message: "Menu item inserted successfully",
    })
        }
        return results
    }
    catch(err){
        console.error("ERROR:",err)
        throw err
    }
}

async function CheckMenuCategory(managerId, categoryId) {
  const [rows] = await db.query(
    `SELECT 1 FROM menu_category 
     WHERE MenuCategoryID = ? AND ManagerID = ?`,
    [categoryId, managerId]
  );
  return rows.length > 0;
}
async function CheckManger(ManagerID){
    const [rows] = await db.query(`SELECT * FROM manager where  ManagerID  = ?`,[ManagerID])
    return rows.length > 0
}

async function UpdateMenuItem(formdata,id){
    try{
    const existManagerId = await CheckManger(formdata.ManagerID);
    if (!existManagerId) {
      return { error: true, message: "Manager not found" };
    }
    const existMenuCategoryId = await CheckMenuCategory(
      formdata.ManagerID,
      formdata.MenuCategoryID
    );

    if (!existMenuCategoryId) {
      return {
        error: true,
        message: "MenuCategory not found for this Manager"
      };
    }
    const [data] = await db.query(
      `UPDATE menu_item
       SET
         ManagerID = ?,
         MenuCategoryID = ?,
         ItemName = ?,
         Description = ?,
         Price = ?,
         IsAvailable = ?
       WHERE MenuItemID = ?`,
      [
        formdata.ManagerID,
        formdata.MenuCategoryID,
        formdata.ItemName,
        formdata.Description ?? null,
        formdata.Price,
        formdata.IsAvailable ?? 1,
        id
      ]
    );

    if (data.affectedRows === 0) {
      return {
        error: true,
        message: "Menu item not found or no changes made"
      };
    }

    return {
      error: false,
      message: "Menu item updated successfully"
    };
}
    catch(err){
        console.error("ERROR:",err)
        throw err
    }
}

async function DeleteMenuItem(id){
    try{
    const [data] = await db.query(`Delete  mi
        From menu_item mi
        join manager mr
        on mi.ManagerID = mr.ManagerID
        join menu_category mc 
        on mi.MenuCategoryID = mc.MenuCategoryID
        where MenuItemID = ?`,[id])
    }catch(err){
        console.error("ERROR:",err)
        throw err
    }
}

module.exports = {getAllMenuItem,getByIdMenuItem,InsertMenuItem,UpdateMenuItem,DeleteMenuItem}