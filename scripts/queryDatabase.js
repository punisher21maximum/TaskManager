const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.db', // Path to your SQLite database file
});

// Define the Task model
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'open',
  },
});

// Function to create 5 task records
const createSampleTasks = async () => {
  try {
    // Sync the model with the database
    await sequelize.sync();

    // Create 5 sample task records
    const tasks = [
      {
        title: 'Task 1',
        description: 'Description for Task 1',
        status: 'open',
      },
      {
        title: 'Task 2',
        description: 'Description for Task 2',
        status: 'inprogress',
      },
      {
        title: 'Task 3',
        description: 'Description for Task 3',
        status: 'completed',
      },
      {
        title: 'Task 4',
        description: 'Description for Task 4',
        status: 'open',
      },
      {
        title: 'Task 5',
        description: 'Description for Task 5',
        status: 'inprogress',
      },
    ];

    // Create the tasks in the database
    await Task.bulkCreate(tasks);

    console.log('Sample tasks created successfully.');
  } catch (error) {
    console.error('Error creating sample tasks:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

// Call the function to create sample tasks
createSampleTasks();
