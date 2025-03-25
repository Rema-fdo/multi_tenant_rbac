"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const crypto = require("crypto");

class Tenant extends Model {
  static associate(models) {
    Tenant.hasMany(models.User, {
      foreignKey: "tenant_id",
      as: "users",
    });
  }
}

Tenant.init(
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
    signing_secret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tenant",
    tableName: "tenants",
    // underscored: true,
    timestamps: true,
    hooks: {
      beforeCreate: async (tenant) => {
        if (!tenant.signing_secret) {
          console.log("Before Create Hook Running...");
          tenant.signing_secret = crypto.randomBytes(32).toString("hex");
        }
      },
    },
  }
);

module.exports = Tenant;
