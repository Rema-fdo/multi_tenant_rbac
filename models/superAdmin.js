"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const crypto = require("crypto");
const bcrypt = require('bcryptjs');

class SuperAdmin extends Model {
  static associate(models) {
  }
}

SuperAdmin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize,
    modelName: "SuperAdmin",
    tableName: "superAdmins",
    // underscored: true,
   timestamps: true,
    hooks: {
      beforeCreate: async (superAdmin) => {
        const salt = await bcrypt.genSalt(10);
        superAdmin.password = await bcrypt.hash(superAdmin.password, salt);
      },
    },
  }
);

module.exports = SuperAdmin;
