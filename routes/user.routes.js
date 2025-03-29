const express = require("express");
const userServices = require("../services/user.services");
const authenticate = require("../middleware/authentication.middleware");
const authorize = require("../middleware/authorization.middleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: "Bearer {token}"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               tenant_id:
 *                 type: integer
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 tenant_id:
 *                   type: integer
 *                 role:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 */

router.post("/user",authenticate,authorize, async (req, res) => {
    try {
        const { name, email, password, tenant_id, role } = req.body;
        const response = await userServices.createUser(name, email, password, tenant_id, role)
    
        res.status(201).json(response);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users for a tenant
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: "Bearer {token}"
 *       - in: query
 *         name: tenant_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Tenant ID
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   tenant_id:
 *                     type: integer
 *                   role:
 *                     type: string
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       500:
 *         description: Server error
 */

router.get("/users", authenticate, authorize, async (req, res) => {
    try {
        const { tenant_id } = req.query;
        const response = await userServices.getUsers(tenant_id)
        res.status(200).json(response);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Error fetching users" });
      }
    });

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: "Bearer {token}"
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 tenant_id:
 *                   type: integer
 *                 role:
 *                   type: string
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       500:
 *         description: Server error
 */

router.get("/profile", authenticate, authorize, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userServices.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Error fetching users" });
    }
});

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Get a user's profile by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: "Bearer {token}"
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 tenant_id:
 *                   type: integer
 *                 role:
 *                   type: string
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.get("/profile/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userServices.getUserById(id)
    res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching profiles:", error);
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;
