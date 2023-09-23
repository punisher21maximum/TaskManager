// api/taskApi.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a task
router.post('/tasks', taskController.createTask);

// Update a task
router.put('/tasks/:taskId', taskController.updateTask);

// Get all tasks
router.get('/tasks', taskController.getAllTasks);

router.get('/task-metrics', taskController.getMetrics);

module.exports = router;
