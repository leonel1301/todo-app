const express = require('express');
const router = express.Router();

const taskController = require('../controllers/TaskController')

router.post('/task', taskController.createTask);
router.put('/task/:id', taskController.updateTask);
router.delete('/task/:id', taskController.deleteTask);
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:status', taskController.getTaskByStatus);


module.exports = router;