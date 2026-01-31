const express = require("express");
const {
  GetAllResturentes,
  GetByIdResturentes,
  InsertedResturentes,
  UpdatedResturentes,
  DeletedResturentes,
} = require("../services/resturent.service");
const { allowRoles } = require("../middlewear/roleMiddlewear");

const ResturentRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resturents
 *   description: Restaurant management APIs
 */

/**
 * @swagger
 * /resturents:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Resturents]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResturentResponse'
 */
ResturentRouter.get("/",allowRoles("Manager","Waiter"), async (req, res) => {
  const data = await GetAllResturentes();
  res.send(data);
});

/**
 * @swagger
 * /resturents/{id}:
 *   get:
 *     summary: Get restaurant by ID
 *     tags: [Resturents]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResturentResponse'
 *       404:
 *         description: Restaurant not found
 */

ResturentRouter.get("/:id",allowRoles("Manager"), async (req, res) => {
  const data = await GetByIdResturentes(req.params.id);
  res.send(data);
});

/**
 * @swagger
 * /resturents:
 *   post:
 *     summary: Add a new restaurant
 *     tags: [Resturents]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resturent'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResturentResponse'
 */

ResturentRouter.post("/",allowRoles("Manager"), async (req, res) => {
  const data = await InsertedResturentes(req.body);
  res.status(201).json(data);
});

/**
 * @swagger
 * /resturents/{id}:
 *   put:
 *     summary: Update a restaurant
 *     tags: [Resturents]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resturent'
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResturentResponse'
 */

ResturentRouter.put("/:id",allowRoles("Manager","Waiter"), async (req, res) => {
  const data = await UpdatedResturentes(req.body, req.params.id);
  res.send(data);
});
/**
 * @swagger
 * /resturents/{id}:
 *   delete:
 *     summary: Delete a restaurant
 *     tags: [Resturents]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 */
ResturentRouter.delete("/:id",allowRoles("Manager"), async (req, res) => {
  const data = await DeletedResturentes(req.params.id);
  res.send(data);
});

module.exports = ResturentRouter;
