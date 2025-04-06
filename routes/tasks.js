const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET tareas por usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.params.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET una tarea por ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST crear tarea
router.post('/', async (req, res) => {
    const task = new Task({
        userId: req.body.userId,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        tags: req.body.tags,
        translations: req.body.translations
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT actualizar tarea
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        
        // Actualizar campos
        Object.keys(req.body).forEach(key => {
            if (key !== '_id' && key !== 'createdAt') {
                task[key] = req.body[key];
            }
        });
        
        task.updatedAt = Date.now();
        
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE eliminar tarea
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        
        await task.deleteOne();
        res.json({ message: 'Tarea eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;