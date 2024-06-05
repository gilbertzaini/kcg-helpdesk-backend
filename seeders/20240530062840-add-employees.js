"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Employees", [
      {
        employee_id: "KCG-05579",
        name: "Gilbert",
        division: "IT",
        role: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employee_id: "KCG-05545",
        name: "Akbar",
        division: "IT",
        role: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employee_id: "KCG-05515",
        name: "Aidan",
        division: "IT",
        role: "QC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employee_id: "KCG-05526",
        name: "Darryl",
        division: "IT",
        role: "Assigner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employee_id: "KCG-05691",
        name: "Ilham",
        division: "BusDev",
        role: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employee_id: "KCG-05546",
        name: "Ashel",
        division: "LnD",
        role: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employee_id: "KCG-05542",
        name: "Novia",
        division: "HRGA",
        role: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        employee_id: "KCG-05550",
        name: "Andrew",
        division: "Marketing",
        role: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Employees",
      {
        employee_id: [
          "KCG-05579",
          "KCG-05545",
          "KCG-05515",
          "KCG-05526",
          "KCG-05691",
          "KCG-05546",
          "KCG-05542",
          "KCG-05550",
        ],
      },
      {}
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
