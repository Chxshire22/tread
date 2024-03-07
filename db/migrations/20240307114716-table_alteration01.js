'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('chatrooms', 'message_id');
    await queryInterface.addColumn('messages', 'chatroom_id',{
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'chatrooms',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.addColumn('chatrooms', 'message_id',{
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'messages',
        key: 'id'
      }})
    await queryInterface.removeColumn('messages', 'chatroom_id');
  }
};
