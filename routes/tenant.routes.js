const express = require("express");
const tenantServices = require("../services/tenant.services");

const router = express.Router();

router.post("/tenant", async (req, res) => {
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
