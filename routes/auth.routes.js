const express = require("express");
const userServices = require("../services/user.services");
const superAdminServices = require("../services/superAdmin.services");
const authenticate = require("../middleware/authentication.middleware");
const authHelpers = require("../helpers/auth.helpers");

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
 *   name: Authentication
 *   description: User and Super Admin authentication APIs
 */

/**
 * @swagger
 * /auth/users/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePassword123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Invalid credentials
 */

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await userServices.login(email, password);

    res.status(200).json(response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /auth/superadmins/login:
 *   post:
 *     summary: Super Admin login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePassword123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Invalid credentials
 */

router.post("/superadmins/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await superAdminServices.login(email, password);

    res.status(200).json(response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /auth/admins/refresh-token:
 *   post:
 *     summary: Refresh token for Admin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR..."
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Invalid refresh token
 */

router.post("/admins/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const response = await superAdminServices.refreshToken(refreshToken);

    res.status(200).json(response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }  
});

/**
 * @swagger
 * /auth/users/refresh-token:
 *   post:
 *     summary: Refresh token for User
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR..."
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Invalid refresh token
 */

router.post("/users/refresh-token", async (req,res) => {
  try {
    const { refreshToken } = req.body;
    const response = await userServices.refreshToken(refreshToken);

    res.status(200).json(response);
  }
  catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
