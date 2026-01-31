const db  = require("../db/mysql")

async function getAllMenuItem(){
    try{
    const [data] = await db.query(`SELECT * FROM menu_items`)
        return data
    }
    catch(err){
        console.error("ERROR:",err)
        throw err
    }

}

async function getByIdMenuItem(id){
    try{
    const [data] = await db.query(`SELECT * FROM menu_items where item_id =${id}`)
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
      `INSERT INTO menu_items
      (
        category_id,
        	name,
          price,
          description,
          image,
          status
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        item.category_id,
        item.name,
        item.price,
        item.description ?? null,
        item.image,
        item.	status ?? 1
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

async function CheckMenuCategory(category_id) {
  const [rows] = await db.query(
    `SELECT 1 FROM menu_category 
     WHERE category_id = ?`,
    [category_id]
  );
  return rows.length > 0;
}


async function UpdateMenuItem(formdata,id){
    try{
   
    const existMenuCategoryId = await CheckMenuCategory(
     formdata.category_id
    );

    if (!existMenuCategoryId) {
      return {
        error: true,
        message: "MenuCategory not found for this Waiter"
      };
    }
    const [data] = await db.query(
      `UPDATE menu_items
       SET
         item_id = ?,
         category_id = ?,
         name = ?,
         price = ?,
        description = ?,
         image = ?,
         status = ?
       WHERE item_id = ?`,
      [
        formdata.category_id,
        formdata.name,
        formdata.price,
        formdata.	description ?? null,
        formdata.image,
        formdata.status ?? 1,
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
    const [data] = await db.query(`DELETE FROM menu_items WHERE item_id = ?`,[id])
    return data
    }catch(err){
        console.error("ERROR:",err)
        throw err
    }
}

module.exports = {getAllMenuItem,getByIdMenuItem,InsertMenuItem,UpdateMenuItem,DeleteMenuItem}