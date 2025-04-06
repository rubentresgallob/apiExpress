const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render('pages/tasks', { title: 'Lista de Tareas', tasks });
  } catch (err) {
    res.status(500).render('pages/error', { title: 'Error', message: err.message });
  }
});

// GET una tarea por ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).render('pages/error', { title: 'Error', message: 'Tarea no encontrada' });
    res.render('pages/task', { title: 'Detalles de la Tarea', task });
  } catch (err) {
    res.status(500).render('pages/error', { title: 'Error', message: err.message });
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
    const newTask = await task.save();
    res.status(201).redirect('/tasks');
  } catch (err) {
    res.status(400).render('pages/error', { title: 'Error', message: err.message });
  }
});

// PUT actualizar una tarea
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).render('pages/error', { title: 'Error', message: 'Tarea no encontrada' });

    Object.keys(req.body).forEach((key) => {
      if (key !== '_id' && key !== 'createdAt') {
        task[key] = req.body[key];
      }
    });

    const updatedTask = await task.save();
    res.redirect('/tasks');
  } catch (err) {
    res.status(400).render('pages/error', { title: 'Error', message: err.message });
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
    res.status(500).render('pages/error', { title: 'Error', message: err.message });
  }
});

module.exports = router;