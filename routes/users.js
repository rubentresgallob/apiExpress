const express = require('express');
const router = express.Router();
const User = require('../models/user.model'); // Asegúrate de que el modelo esté correctamente definido

// GET todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('pages/users', { title: 'Lista de Usuarios', users });
  } catch (err) {
    res.status(500).render('pages/error', { title: 'Error', message: err.message });
  }
});

// GET un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).render('pages/error', { title: 'Error', message: 'Usuario no encontrado' });
    res.render('pages/user', { title: 'Detalles del Usuario', user });
  } catch (err) {
    res.status(500).render('pages/error', { title: 'Error', message: err.message });
  }
});

// POST crear un nuevo usuario
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // Asegúrate de manejar contraseñas de forma segura (hashing)
  });

  try {
    const newUser = await user.save();
    res.status(201).redirect('/users'); // Redirige a la lista de usuarios después de crear uno nuevo
  } catch (err) {
    res.status(400).render('pages/error', { title: 'Error', message: err.message });
  }
});

// PUT actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).render('pages/error', { title: 'Error', message: 'Usuario no encontrado' });

    // Actualizar campos
    Object.keys(req.body).forEach((key) => {
      if (key !== '_id' && key !== 'createdAt') {
        user[key] = req.body[key];
      }
    });

    const updatedUser = await user.save();
    res.redirect('/users'); // Redirige a la lista de usuarios después de actualizar
  } catch (err) {
    res.status(400).render('pages/error', { title: 'Error', message: err.message });
  }
});

// DELETE eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).render('pages/error', { title: 'Error', message: 'Usuario no encontrado' });

    await user.deleteOne();
    res.redirect('/users'); // Redirige a la lista de usuarios después de eliminar
  } catch (err) {
    res.status(500).render('pages/error', { title: 'Error', message: err.message });
  }
});

module.exports = router;