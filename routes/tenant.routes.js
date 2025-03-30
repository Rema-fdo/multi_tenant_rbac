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

/**
 * @swagger
 * /tenant/{id}/access:
 *   post:
 *     summary: Assign or update access for an admin in a tenant
 *     description: Grants admin access to a user within a specific tenant.
 *     tags:
 *       - Tenant Management
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
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tenant to which the user access is being assigned.
 *       - in: header
 *         name: TenantId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID of the tenant making the request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - role
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 5
 *                 description: ID of the user to assign access.
 *               role:
 *                 type: string
 *                 enum: [admin]
 *                 example: "admin"
 *                 description: Role to be assigned to the user in the tenant.
 *     responses:
 *       200:
 *         description: Successfully assigned access to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User 5 updated successfully in Tenant 3"
 *       400:
 *         description: Bad request due to missing or incorrect parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       401:
 *         description: Unauthorized request (Invalid or missing token).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized: No token provided"
 *       403:
 *         description: Forbidden - Insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden: Insufficient permissions"
 *       404:
 *         description: Tenant or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found in this tenant"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error managing access"
 */

router.post("/tenant/:id/access", authenticate, authorize, async (req, res) => {
  try {
    const tenant_id = req.params.id;
    const { user_id, role } = req.body;
    const response = await tenantServices.manageTenantAccess(tenant_id, user_id, role);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Error managing access: " + error.message });
  }
});

module.exports = router;
