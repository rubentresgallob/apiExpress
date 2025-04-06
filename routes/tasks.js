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
    completed: req.body.completed === 'true', // Convertir el valor a booleano
  });

  try {
    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    res.status(400).render('pages/error', { title: 'Error', message: 'Error al añadir la tarea' });
  }
});

// DELETE eliminar una tarea
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).render('pages/error', { title: 'Error', message: 'Tarea no encontrada' });

    await task.deleteOne();
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).render('pages/error', { title: 'Error', message: 'Error al eliminar la tarea' });
  }
});

module.exports = router;