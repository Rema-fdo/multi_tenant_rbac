const express = require("express");
const tenantServices = require("../services/tenant.services");
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
 *   name: Tenants
 *   description: Tenant management APIs
 */

/**
 * @swagger
 * /tenant:
 *   post:
 *     summary: Create a new tenant
 *     tags: [Tenants]
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
 *                 example: "Acme Corp"
 *     responses:
 *       201:
 *         description: Tenant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Acme Corp"
 *       400:
 *         description: Bad request (Invalid input)
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       500:
 *         description: Server error
 */

router.post("/tenant",authenticate,authorize, async (req, res) => {
  try {
    const { name } = req.body;
    const tenant = await tenantServices.createTenant(name)
    res.status(201).json(tenant);
  } catch (error) {
    console.error("Error creating tenant:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
