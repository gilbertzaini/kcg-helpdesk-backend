"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Tickets.belongsToMany(models.Employees);
    }
  }
  Tickets.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      // subtitle: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      divisi: { type: DataTypes.STRING, allowNull: false },
      deadline: { type: DataTypes.DATE, allowNull: false },
      assigned_by: { type: DataTypes.STRING, allowNull: false },
      assigned_to: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      file_path: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Tickets",
    }
  );
  return Tickets;
};