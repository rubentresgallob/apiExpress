const express = require('express');
const router = express.Router();
const Habit = require('../models/Habits');

// GET todos los hábitos
router.get('/', async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET hábitos por usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.params.userId });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET un hábito por ID
router.get('/:id', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Hábito no encontrado' });
        res.json(habit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST crear hábito
router.post('/', async (req, res) => {
    const habit = new Habit({
        userId: req.body.userId,
        name: req.body.name,
        frequency: req.body.frequency,
        goalPerPeriod: req.body.goalPerPeriod,
        unit: req.body.unit,
        translations: req.body.translations
    });

    try {
        const newHabit = await habit.save();
        res.status(201).json(newHabit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST agregar progreso a un hábito
router.post('/:id/progress', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Hábito no encontrado' });
        
        habit.progress.push({
            value: req.body.value,
            notes: req.body.notes,
            completionDate: req.body.completionDate || new Date()
        });
        
        const updatedHabit = await habit.save();
        res.status(201).json(updatedHabit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT actualizar hábito
router.put('/:id', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Hábito no encontrado' });
        
        // Actualizar campos
        Object.keys(req.body).forEach(key => {
            if (key !== '_id' && key !== 'createdAt' && key !== 'progress') {
                habit[key] = req.body[key];
            }
        });
        
        const updatedHabit = await habit.save();
        res.json(updatedHabit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE eliminar hábito
router.delete('/:id', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Hábito no encontrado' });
        
        await habit.deleteOne();
        res.json({ message: 'Hábito eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;