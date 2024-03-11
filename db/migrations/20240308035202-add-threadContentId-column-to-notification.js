"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("notifications", "threads_contents_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "threads_contents",
        key: "id",
      }
    });
    await queryInterface.addColumn("notifications", "goto_url", {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("notifications", "threads_contents_id");
    await queryInterface.removeColumn("notifications", "goto_url");
  },
};
