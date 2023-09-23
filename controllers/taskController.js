// controllers/taskController.js
const Task = require("../models/taskModel");

// Create a task
exports.createTask = async (req, res) => {
  console.log(req.body);
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status });
    res.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task." });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    console.log("here-->", req.params, req.body);
    const { taskId } = req.params; // Extract the task ID from the URL parameters
    const { title, description, status } = req.body;

    // Find the task by ID
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task properties
    task.title = title;
    task.description = description;
    task.status = status;

    // Save the updated task to the database
    await task.save();

    // Send the updated task as a JSON response
    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task." });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

// Get metrics
exports.getMetrics = async (req, res) => {
  try {
    const { date } = req.query;

    // Prepare metrics object
    let metrics = {
      open_tasks: 0,
      inprogress_tasks: 0,
      completed_tasks: 0,
    };

    if (date) {
      // If date is provided, filter tasks by that date
      const tasks = await Task.findAll({
        where: {
          createdAt: {
            $between: [new Date(date), new Date(date)],
          },
        },
      });

      // Calculate metrics for the filtered tasks
      for (const task of tasks) {
        if (task.status === "open") {
          metrics.open_tasks++;
        } else if (task.status === "inprogress") {
          metrics.inprogress_tasks++;
        } else if (task.status === "completed") {
          metrics.completed_tasks++;
        }
      }

      // Prepare the response with the specified date
      const response = {
        date: new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        }),
        metrics,
      };

      res.json(response);
    } else {
      // If no date is provided, calculate metrics for all tasks
      const tasks = await Task.findAll();

      // Calculate metrics for all tasks
      for (const task of tasks) {
        if (task.status === "open") {
          metrics.open_tasks++;
        } else if (task.status === "inprogress") {
          metrics.inprogress_tasks++;
        } else if (task.status === "completed") {
          metrics.completed_tasks++;
        }
      }

      // Send the metrics for the complete table
      res.json(metrics);
    }
  } catch (error) {
    console.error("Error fetching task metrics:", error);
    res.status(500).json({ error: "Failed to fetch task metrics." });
  }
};
