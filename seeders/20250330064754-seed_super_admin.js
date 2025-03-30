"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);

    const superAdmins = [
      {
        name: "rema",
        email: "rema@example.com",
        password: await bcrypt.hash("password123", salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "rema_fdo",
        email: "rema_fdo@example.com",
        password: await bcrypt.hash("password456", salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("superAdmins", superAdmins);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("superAdmins", null, {});
  },
};
