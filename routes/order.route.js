const express = require("express");
const {
  GetAlloreders,
  GetByIdoreders,
  Insertedoreders,
  Updatededoreders,
  Deletedoreders,
} = require("../services/order.service");
const { allowRoles } = require("../middlewear/roleMiddlewear");

const orderRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs for Restaurant POS
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - user_id
 *         - table_number
 *         - order_status
 *       properties:
 *         user_id:
 *           type: integer
 *           example: 5
 *         table_number:
 *           type: integer
 *           example: 12
 *         order_status:
 *           type: string
 *           example: "pending"
 *         total_amount:
 *           type: number
 *           example: 850
 *         notes:
 *           type: string
 *           example: "Less spicy"
 *
 *     OrderResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Order processed successfully"
 *         data:
 *           type: object
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Accessible Roles:
 *       - Manager
 *       - Waiter
 *       - Chef
 *       - Cashier
 *     responses:
 *       200:
 *         description: List of all orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

orderRouter.get("/",allowRoles("Manager", "Waiter","Chef","Cashier"), async (req, res) => {
  const data = await GetAlloreders();
  res.send(data);
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
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
 *         description: Order details
 *       404:
 *         description: Order not found
 */

orderRouter.get("/:id",allowRoles("Manager", "Waiter","Chef","Cashier"), async (req, res) => {
  const data = await GetByIdoreders(req.params.id);
  res.send(data);
});

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Accessible Roles:
 *       - Waiter
 *       - Chef
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *           example:
 *             user_id: 7
 *             table_number: 4
 *             order_status: "pending"
 *             total_amount: 560
 *             notes: "No onion"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       403:
 *         description: Access denied
 */

orderRouter.post("/",allowRoles( "Waiter","Chef","user"), async (req, res) => {
  const data = await Insertedoreders(req.body);
  res.status(201).json(data);
});

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Accessible Roles:
 *       - Manager
 *       - Waiter
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
 *             $ref: '#/components/schemas/Order'
 *           example:
 *             order_status: "completed"
 *             total_amount: 600
 *     responses:
 *       200:
 *         description: Order updated successfully
 */

orderRouter.put("/:id",allowRoles("Manager", "Waiter"), async (req, res) => {
  const data = await Updatededoreders(req.body, req.params.id);
  res.send(data);
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Accessible Roles:
 *       - Manager
 *       - Waiter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */

orderRouter.delete("/:id",allowRoles("Manager", "Waiter"), async (req, res) => {
  const data = await Deletedoreders(req.params.id);
  res.send(data);
});

module.exports = orderRouter;
