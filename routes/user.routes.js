const express = require("express");
const userServices = require("../services/user.services");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/user",authenticate, async (req, res) => {
    try {
        const { name, email, password, tenant_id, role } = req.body;
        const response = await userServices.createUser(name, email, password, tenant_id, role)
    
        res.status(201).json(response);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });  }
});

router.get("/users", authenticate, async (req, res) => {
    try {
        const { tenant_id } = req.query;
        const response = await userServices.getUsers(tenant_id)
        res.status(200).json(response);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Error fetching users" });
      }
    });

    router.get("/profile", authenticate, async (req, res) => {
      try {
        const userId = req.user.id;
        const user = await userServices.getUserById(userId);
        res.status(200).json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Error fetching users" });
      }
    });

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
