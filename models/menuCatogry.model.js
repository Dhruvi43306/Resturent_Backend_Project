const db = require("../db/mysql")

async function getAllMenuCategory(){
    try{
    const [data] = await db.query(`SELECT 1 FROM menu_category`)
        return data
    }catch(err){
        console.error("ERROR:",err)
        throw err
    }

}

async function getByIdMenuCategory(id){
    try{
    const [data] = await db.query(`SELECT 1 FROM menu_category where MenuCategoryID = ${id}`)
        return data
    }catch(err){
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

async function InsertMenuCategory(formdata){
    try{
          const results = [];

  for (const item of formdata) {

    const validCategory = await CheckMenuCategory(
      item.ManagerID,
      item.MenuCategoryID
    );

    if (!validCategory) {
      results.push({
        error: true,
        message: "Invalid MenuCategoryID for this Manager"
      });
      continue;
    }

    const [data] = await db.query(
      `INSERT INTO menu_item
       (ManagerID, MenuCategoryID, ItemName, Description, Price, IsAvailable)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        item.ManagerID,
        item.MenuCategoryID,
        item.ItemName,
        item.Description ?? null,
        item.Price,
        item.IsAvailable ?? 1
      ]
    );

    results.push({
      error: false,
      message: "Menu item inserted successfully",
      MenuItemID: data.insertId
    });
  }

  return results;

}
    catch(err){
      console.error("ERROR:",err)
        throw err  
    }
}
async function CheckManger(ManagerID){
   
    const [rows] = await db.query(`SELECT * FROM manager where  ManagerID  = ?`,[ManagerID])
    return rows.length > 0
} 
async function UpdateMenuCategory(formdata,id){
    try{
        const existMangerId = await CheckManger(formdata.ManagerID)
        if(!existMangerId){
            return{
            error:true,
            message:"Manager not found or inactive"
        }
        }
        const [data] = await db.query(
        `UPDATE  
       SET
         CategoryName = ?,
         Description = ?,
         IsActive = ?
       WHERE MenuCategoryID = ?`,
      [
        formdata.CategoryName,
        formdata.Description ?? null,
        formdata.IsActive ?? 1,
        id
      ])
      if (data.affectedRows === 0) {
      return {
        error: true,
        message: "Menu category not found or no changes made"
      };
    }

    return {
      error: false,
      message: "Menu category updated successfully"
    }
}
    catch(err){
         console.error("ERROR:",err)
        throw err  
    }
}

async function DeleteMenuCategory(id){
    try{
    const [data] = await db.query(`
        DELETE mr from 
        menu_category mr
        join manager m
        on mr.ManagerID = m.ManagerID
        where MenuCategoryID = ?`,[id]
    )
    return data
}
catch(err){
    console.error("ERROR:",err)
    throw err
}
}
module.exports = {getAllMenuCategory,getByIdMenuCategory,InsertMenuCategory,UpdateMenuCategory,DeleteMenuCategory}