// taskModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.db', 
});

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'open', // Default status
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// Synchronize the model with the database (creates the table)
sequelize.sync({ force: false }) // Use { force: true } to drop and recreate the table if it exists
  .then(() => {
    console.log('Task model synchronized with the database.');
  })
  .catch((error) => {
    console.error('Error synchronizing Task model:', error);
  });

module.exports = Task;
