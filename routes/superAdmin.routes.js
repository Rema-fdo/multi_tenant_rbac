const express = require("express");
const adminServices = require("../services/superAdmin.services");

const router = express.Router();

/**
 * @swagger
 * /admin:
 *   post:
 *     summary: Create a new Super Admin
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePassword123"
 *     responses:
 *       201:
 *         description: Super Admin created successfully
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
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "admin@example.com"
 *       400:
 *         description: Bad request (Invalid input)
 *       500:
 *         description: Server error
 */

router.post("/admin", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const response = await adminServices.createAdmin(name, email, password)
    
        res.status(201).json(response);
  } catch (error) {
    console.error("Error creating Admin:", error);
    res.status(400).json({ error: error.message });  }
});

module.exports = router;
