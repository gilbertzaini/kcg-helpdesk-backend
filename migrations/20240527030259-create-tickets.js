"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // subtitle: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      divisi: {
        type: Sequelize.STRING,
      },
      deadline: {
        type: Sequelize.DATE,
      },
      assigned_by: {
        type: Sequelize.STRING,
      },
      assigned_by_date: {
        type: Sequelize.DATE,
      },
      assigned_to: {
        type: Sequelize.STRING,
      },
      assigned_to_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        default: "new",
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tickets");
  },
};
