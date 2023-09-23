const Task = require('../models/taskModel'); // Import your Task model

// Function to fetch and print all tasks
async function getAllTasks() {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.findAll();

    if (tasks.length === 0) {
      console.log('No tasks found.');
    } else {
      // Print the tasks
      console.log('All Tasks:');
      tasks.forEach((task, index) => {
        console.log(`Task ${index + 1}:`);
        console.log(`Title: ${task.title}`);
        console.log(`Description: ${task.description}`);
        console.log(`Status: ${task.status}`);
        console.log('------------------');
      });
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Call the function to fetch and print tasks
getAllTasks();
