const express = require("express");
const userServices = require("../services/user.services");
const superAdminServices = require("../services/superAdmin.services");
const authenticate = require("../middleware/auth.middleware");
const authHelpers = require("../helpers/auth.helpers");

const router = express.Router();

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
