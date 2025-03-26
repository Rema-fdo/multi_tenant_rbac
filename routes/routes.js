const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes")
const tenantRoutes = require("./tenant.routes")

router.use("/auth", authRoutes);
router.use("/", userRoutes)
router.use("/", tenantRoutes)

module.exports = router;
