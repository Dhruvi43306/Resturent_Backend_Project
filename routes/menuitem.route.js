const express = require("express");
const {
  GetAllMenuItemes,
  GetByIdMenuItemes,
  InsertedMenuItemes,
  UpdatedMenuItemes,
  DeletedMenuItemes,
} = require("../services/menuitem.service");
const { allowRoles } = require("../middlewear/roleMiddlewear");

const menuItemRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Menu Items
 *   description: Menu item management APIs (Restaurant POS)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - category_id
 *         - item_name
 *         - price
 *       properties:
 *         category_id:
 *           type: integer
 *           example: 1
 *         item_name:
 *           type: string
 *           example: "Paneer Butter Masala"
 *         description:
 *           type: string
 *           example: "Creamy Punjabi-style curry"
 *         price:
 *           type: number
 *           example: 250
 *         is_available:
 *           type: boolean
 *           example: true
 *
 *     MenuItemResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Operation successful"
 *         data:
 *           type: object
 */

/**
 * @swagger
 * /menu-items:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Accessible Roles:
 *       - Manager
 *       - Waiter
 *       - Chef
 *       - Cashier
 *       - User
 *     responses:
 *       200:
 *         description: List of menu items
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
menuItemRouter.get("/",allowRoles("Manager", "Waiter","Chef","Cashier","User"), async (req, res) => {
  const data = await GetAllMenuItemes();
  res.send(data);
});

/**
 * @swagger
 * /menu-items/{id}:
 *   get:
 *     summary: Get menu item by ID
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu item details
 *       404:
 *         description: Item not found
 */

menuItemRouter.get("/:id",allowRoles("Manager"), async (req, res) => {
  const data = await GetByIdMenuItemes(req.params.id);
  res.send(data);
});

/**
 * @swagger
 * /menu-items:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     description: Manager only
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *           example:
 *             category_id: 2
 *             item_name: "Veg Biryani"
 *             description: "Aromatic rice with vegetables"
 *             price: 180
 *             is_available: true
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *       403:
 *         description: Access denied
 */
menuItemRouter.post("/",allowRoles("Manager"), async (req, res) => {
  const data = await InsertedMenuItemes(req.body);
  res.status(201).json(data);
});

/**
 * @swagger
 * /menu-items/{id}:
 *   put:
 *     summary: Update menu item
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Manager only  
 *       Accepts **single object or array of objects**
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/MenuItem'
 *               - type: array
 *                 items:
 *                   $ref: '#/components/schemas/MenuItem'
 *           example:
 *             item_name: "Veg Biryani Special"
 *             price: 200
 *             is_available: true
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 */
menuItemRouter.put("/:id",allowRoles("Manager"), async (req, res) => {
  const formdata = Array.isArray(req.body) ? req.body[0] : req.body;
  const data = await UpdatedMenuItemes(formdata, req.params.id);
  res.send(data);
});

/**
 * @swagger
 * /menu-items/{id}:
 *   delete:
 *     summary: Delete menu item
 *     tags: [Menu Items]
 *     security:
 *       - bearerAuth: []
 *     description: Manager only
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 */

menuItemRouter.delete("/:id",allowRoles("Manager"), async (req, res) => {
  const data = await DeletedMenuItemes(req.params.id);
  res.send(data);
});

module.exports = menuItemRouter;
