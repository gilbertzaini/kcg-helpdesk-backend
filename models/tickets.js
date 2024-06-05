"use strict";
const { Model, DataTypes } = require("sequelize");
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
      deadline: { type: DataTypes.DATE },
      request_by: { type: DataTypes.STRING },
      request_by_date: { type: DataTypes.DATE },
      request_by_div: { type: DataTypes.STRING },
      assigned_by: { type: DataTypes.STRING },
      assigned_to: { type: DataTypes.STRING },
      assigned_date: { type: DataTypes.DATE },
      status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'new' },
      is_deleted: {type: DataTypes.BOOLEAN, defaultValue: false}      
    },
    {
      sequelize,
      modelName: "Tickets",
    }
  );
  return Tickets;
};
