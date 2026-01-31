const express = require("express");
const {
  GetAllOrderItemes,
  GetByIdOrderItemes,
  UpdatedOrderItemes,
  DeletedOrderItemes,
} = require("../services/orderItem.service");

const { InsertOrderItems } = require("../models/orderItem.model");
const { allowRoles } = require("../middlewear/roleMiddlewear");

const orderItemRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: OrderItems
 *   description: Order item management (items inside an order)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - order_id
 *         - menu_item_id
 *         - quantity
 *       properties:
 *         order_id:
 *           type: integer
 *           example: 10
 *         menu_item_id:
 *           type: integer
 *           example: 5
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           example: 250
 *         subtotal:
 *           type: number
 *           example: 500
 *
 *     OrderItemResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Order item processed successfully"
 *         data:
 *           type: object
 */

/**
 * @swagger
 * /order-items:
 *   get:
 *     summary: Get all order items
 *     tags: [OrderItems]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Accessible Roles:
 *       - Manager
 *       - Waiter
 *       - Chef
 *     responses:
 *       200:
 *         description: List of all order items
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

orderItemRouter.get("/",allowRoles("Manager", "Waiter","Chef"), async (req, res) => {
  const data = await GetAllOrderItemes();
  res.send(data);
});

/**
 * @swagger
 * /order-items/{id}:
 *   get:
 *     summary: Get order item by ID
 *     tags: [OrderItems]
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
 *         description: Order item details
 *       404:
 *         description: Order item not found
 */

orderItemRouter.get("/:id",allowRoles("Waiter"), async (req, res) => {
  const data = await GetByIdOrderItemes(req.params.id);
  res.send(data);
});

/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Add item to an order
 *     tags: [OrderItems]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Accessible Roles:
 *       - Waiter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *           example:
 *             order_id: 12
 *             menu_item_id: 3
 *             quantity: 2
 *             price: 180
 *             subtotal: 360
 *     responses:
 *       201:
 *         description: Order item added successfully
 *       403:
 *         description: Access denied
 */

orderItemRouter.post("/",allowRoles("Waiter"), async (req, res) => {
  const data = await InsertOrderItems(req.body);
  res.status(201).json(data);
});

/**
 * @swagger
 * /order-items/{id}:
 *   put:
 *     summary: Update order item
 *     tags: [OrderItems]
 *     security:
 *       - bearerAuth: []
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
 *           example:
 *             quantity: 3
 *             subtotal: 540
 *     responses:
 *       200:
 *         description: Order item updated successfully
 */

orderItemRouter.put("/:id",allowRoles("Waiter"), async (req, res) => {
  const data = await UpdatedOrderItemes(req.body, req.params.id);
  res.send(data);
});

/**
 * @swagger
 * /order-items/{id}:
 *   delete:
 *     summary: Remove item from order
 *     tags: [OrderItems]
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
 *         description: Order item deleted successfully
 */

orderItemRouter.delete("/:id",allowRoles("Waiter"), async (req, res) => {
  const data = await DeletedOrderItemes(req.params.id);
  res.send(data);
});

module.exports = orderItemRouter;
