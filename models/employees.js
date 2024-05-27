"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Employees.hasMany(models.Tickets);
    }
  }
  Employees.init(
    {
      employee_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      division: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Employees",
    }
  );
  return Employees;
};
