const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Crear una nueva tarea
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
