const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// GET todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('pages/users', { title: 'Lista de Usuarios', users });
  } catch (err) {
    res.status(500).render('pages/error', { title: 'Error', message: 'Error al cargar los usuarios' });
  }
});

module.exports = router;