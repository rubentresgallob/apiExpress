const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render('pages/tasks', { title: 'Lista de Tareas', tasks });
  } catch (err) {
    res.status(500).render('pages/error', { title: 'Error', message: 'Error al cargar las tareas' });
  }
});

// POST crear una nueva tarea
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
  });

  try {
    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    res.status(400).render('pages/error', { title: 'Error', message: 'Error al añadir la tarea' });
  }
});

module.exports = router;