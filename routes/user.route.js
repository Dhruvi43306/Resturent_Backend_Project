const express = require("express")
const {
  GetAllUsers,
  GetByIdUsers,
  InsertedUsers,
  UpdatedUsers,
  DeletedUsers,
  registerUser,
  loginUser
} = require("../services/user.service")

const userRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
userRouter.get("/", async (req, res) => {
  const data = await GetAllUsers()
  res.send(data)
})

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User fetched successfully
 */
userRouter.get("/:id", async (req, res) => {
  const data = await GetByIdUsers(req.params.id)
  res.send(data)
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserName:
 *                 type: string
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
userRouter.post("/", async (req, res) => {
  const data = await InsertedUsers(req.body)
  res.send(data)
})

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserName:
 *                 type: string
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
userRouter.post("/register", async (req, res) => {
  const formdata = Array.isArray(req.body) ? req.body[0] : req.body
  console.log(formdata)
  const data = await registerUser(formdata)
  res.status(data.error ? 400 : 201).json(data)
})

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
userRouter.post("/login", async (req, res) => {
  const data = await loginUser(req.body)
  res.status(data.error ? 401 : 200).json(data)
})

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
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
 *             type: object
 *             properties:
 *               UserName:
 *                 type: string
 *               Email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
userRouter.put("/:id", async (req, res) => {
  const formdata = Array.isArray(req.body) ? req.body[0] : req.body
  const data = await UpdatedUsers(formdata, req.params.id)
  res.send(data)
})

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
userRouter.delete("/:id", async (req, res) => {
  const data = await DeletedUsers(req.params.id)
  res.send(data)
})

module.exports = userRouter
