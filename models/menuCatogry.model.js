const db = require("../db/mysql")

async function getAllMenuCategory(){
    try{
    const [data] = await db.query(`SELECT * FROM menu_category`)
        return data
    }catch(err){
        console.error("ERROR:",err)
        throw err
    }

}

async function getByIdMenuCategory(id){
    try{
    const [data] = await db.query(`SELECT * FROM menu_category where category_id = ${id}`)
        return data
    }catch(err){
        console.error("ERROR:",err)
        throw err
    }

}


async function InsertMenuCategory(formdata) {
  try {
    const results = [];

    for (item of formdata) {
      const [data] = await db.query(
        `INSERT INTO menu_category
         (category_id,name,	status)
         VALUES (?, ?,?)`,
        [
          
          item.category_id,
          item.name ,
          item.	status 
        ]
      );

      results.push({
        error: false,
        message: "Menu category inserted successfully",
        category_id: data.insertId
      });
    }

    return results;
  } catch (err) {
    console.error("ERROR:", err);
    throw err;
  }
}

async function UpdateMenuCategory(formdata,id){
    try{
        const body = Array.isArray(formdata) ? formdata[0] : formdata;
        const [data] = await db.query(
        `UPDATE menu_category 
       SET
         name = ?,
         status = ?
        
       WHERE 	category_id = ?`,
      [
        body.name,
        body.status,
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
        DELETE from menu_category where category_id = ?`,[id]
    )
    return data
}
catch(err){
    console.error("ERROR:",err)
    throw err
}
}
module.exports = {getAllMenuCategory,getByIdMenuCategory,InsertMenuCategory,UpdateMenuCategory,DeleteMenuCategory}