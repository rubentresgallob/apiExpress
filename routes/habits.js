const express = require('express');
const router = express.Router();
const Habit = require('../models/Habits');

// GET todos los hábitos
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.render('pages/habits', { title: 'Lista de Hábitos', habits });
  } catch (err) {
    res.status(500).render('pages/error', { title: 'Error', message: 'Error al cargar los hábitos' });
  }
});

// POST crear un nuevo hábito
router.post('/', async (req, res) => {
  const habit = new Habit({
    name: req.body.name,
    frequency: req.body.frequency,
    goalPerPeriod: req.body.goalPerPeriod,
    unit: req.body.unit,
  });

  try {
    await habit.save();
    res.redirect('/habits');
  } catch (err) {
    res.status(400).render('pages/error', { title: 'Error', message: 'Error al añadir el hábito' });
  }
});

module.exports = router;