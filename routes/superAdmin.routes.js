const express = require("express");
const adminServices = require("../services/superAdmin.services");

const router = express.Router();

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
