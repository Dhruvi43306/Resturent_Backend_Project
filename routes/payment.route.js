const express = require("express")
const { GetAllPayment, GetByIdPayment, InsertedPayment, UpdatedPayment, DeletedPayment } = require("../services/payment.service")
const { allowRoles } = require("../middlewear/roleMiddlewear")
const paymentRouter = express.Router()
/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing and transaction management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - order_id
 *         - payment_method
 *         - amount
 *       properties:
 *         order_id:
 *           type: integer
 *           example: 15
 *         payment_method:
 *           type: string
 *           enum: [cash, card, upi]
 *           example: upi
 *         amount:
 *           type: number
 *           example: 850
 *         payment_status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           example: completed
 *
 *     PaymentResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Payment processed successfully
 *         data:
 *           type: object
 */

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Accessible Roles:
 *       - Manager
 *       - Cashier
 *       - User
 *     responses:
 *       200:
 *         description: Payments fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

paymentRouter.get("/",allowRoles("Manager","user","Cashier"),async (req,res)=>{
    const data = await GetAllPayment()
    res.send(data)
})
/**
 * @swagger
 * /payment/{id}:
 *   get:
 *     summary: Get payment details by ID
 *     tags: [Payments]
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
 *         description: Payment details retrieved
 *       404:
 *         description: Payment not found
 */

paymentRouter.get("/:id",async (req,res)=>{
    const data = await GetByIdPayment(req.params.id)
    res.send(data)
})
/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Accessible Roles:
 *       - Cashier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *           example:
 *             order_id: 15
 *             payment_method: upi
 *             amount: 850
 *             payment_status: completed
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       403:
 *         description: Access denied
 */

paymentRouter.post("/",allowRoles("Cashier"),async (req,res)=>{
    const data = await InsertedPayment(req.body)
    res.send(data)
})
/**
 * @swagger
 * /payment/{id}:
 *   put:
 *     summary: Update payment status
 *     tags: [Payments]
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
 *             payment_status: completed
 *     responses:
 *       200:
 *         description: Payment updated successfully
 */

paymentRouter.put("/:id",async (req,res)=>{
    const data = await UpdatedPayment(req.body,req.params.id)
    res.send(data)
})
/**
 * @swagger
 * /payment/{id}:
 *   delete:
 *     summary: Delete payment record
 *     tags: [Payments]
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
 *         description: Payment deleted successfully
 */

paymentRouter.delete("/:id",async (req,res)=>{
    const data = await DeletedPayment(req.params.id)
    res.send(data)
})

module.exports = paymentRouter