const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes")
const tenantRoutes = require("./tenant.routes")
const superAdminRoutes = require("./superAdmin.routes")

router.use("/auth", authRoutes);
router.use("/", userRoutes)
router.use("/", tenantRoutes)
router.use("/", superAdminRoutes)

module.exports = router;
