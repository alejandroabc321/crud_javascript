const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Crear nuevo usuario
router.post('/', async (req, res) => {
  const { id_rol, nombre, apellido, correo_electronico, contraseña, fecha_nacimiento } = req.body;

  if (!id_rol || !nombre || !apellido || !correo_electronico || !contraseña || !fecha_nacimiento) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO Usuarios (id_rol, nombre, apellido, correo_electronico, contraseña, fecha_nacimiento)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_rol, nombre, apellido, correo_electronico, contraseña, fecha_nacimiento]
    );
    res.json({ id_usuario: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario', detalle: err.message });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  const { id_rol, nombre, apellido, correo_electronico, contraseña, fecha_nacimiento } = req.body;
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `UPDATE Usuarios
       SET id_rol = ?, nombre = ?, apellido = ?, correo_electronico = ?, contraseña = ?, fecha_nacimiento = ?
       WHERE id_usuario = ?`,
      [id_rol, nombre, apellido, correo_electronico, contraseña, fecha_nacimiento, id]
    );
    res.json({ mensaje: 'Usuario actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario', detalle: err.message });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id]);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;
