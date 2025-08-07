'use strict';

const { Model } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OtpRequests', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull:false,
        references:{
          model:"Users",
          key:'id',
        },
        onDelete:"CASCADE",
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      otp: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      used: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OtpRequests');
  }
};