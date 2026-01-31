const express = require("express");
const {
  GetAllMenuCategoryes,
  GetByIdMenuCategoryes,
  InsertedMenuCategoryes,
  UpdateMenuCategoryes,
  DeletedMenuCategoryes,
} = require("../services/menuCatogry.service");
const { allowRoles } = require("../middlewear/roleMiddlewear");

const MenuCategoryRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     MenuCategory:
 *       type: object
 *       properties:
 *         category_id:
 *           type: integer
 *           example: 1
 *         category_name:
 *           type: string
 *           example: Starters
 *         description:
 *           type: string
 *           example: Veg and non-veg starters
 *         is_active:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /menuCategory:
 *   get:
 *     summary: Get all menu categories
 *     description: |
 *       Fetch all menu categories.
 *       Accessible by **Manager, Waiter, Chef, Cashier, User**.
 *     tags: [Menu Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Menu categories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuCategory'
 */
 //
MenuCategoryRouter.get("/",allowRoles("Manager", "Waiter","Chef","Waiter","Cashier","user"),async (req, res) => {
  const data = await GetAllMenuCategoryes();
  res.send(data);
});
/**
 * @swagger
 * /menuCategory/{id}:
 *   get:
 *     summary: Get menu category by ID
 *     description: |
 *       Fetch a single menu category using its ID.
 *       Accessible by **Manager only**.
 *     tags: [Menu Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Menu category fetched successfully
 *       404:
 *         description: Category not found
 */
 //
MenuCategoryRouter.get("/:id",allowRoles("Manager"), async (req, res) => {
  const data = await GetByIdMenuCategoryes(req.params.id);
  res.send(data);
});

/**
 * @swagger
 * /menuCategory:
 *   post:
 *     summary: Create new menu category
 *     description: |
 *       Create a new menu category.
 *       Accessible by **Manager only**.
 *     tags: [Menu Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_name
 *             properties:
 *               category_name:
 *                 type: string
 *                 example: Beverages
 *               description:
 *                 type: string
 *                 example: Hot and cold drinks
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Menu category created successfully
 */
 //
MenuCategoryRouter.post("/",allowRoles("Manager"), async (req, res) => {
  const data = await InsertedMenuCategoryes(req.body);
  res.status(201).json(data);
});

/**
 * @swagger
 * /menuCategory/{id}:
 *   put:
 *     summary: Update menu category
 *     description: |
 *       Update an existing menu category.
 *       Accessible by **Manager only**.
 *     tags: [Menu Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 example: Main Course
 *               description:
 *                 type: string
 *                 example: Lunch and dinner items
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Menu category updated successfully
 */
 //
MenuCategoryRouter.put("/:id",allowRoles("Manager"), async (req, res) => {
  const data = await UpdateMenuCategoryes(req.body, req.params.id);
  res.send(data);
});
/**
 * @swagger
 * /menuCategory/{id}:
 *   delete:
 *     summary: Delete menu category
 *     description: |
 *       Delete a menu category by ID.
 *       Accessible by **Manager only**.
 *     tags: [Menu Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     responses:
 *       200:
 *         description: Menu category deleted successfully
 */
 /* */

MenuCategoryRouter.delete("/:id",allowRoles("Manager"), async (req, res) => {
  const data = await DeletedMenuCategoryes(req.params.id);
  res.send(data);
});

module.exports = MenuCategoryRouter;
