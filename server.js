const express = require('express');
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const pool = require('./db');
require('dotenv').config();

// Middleware para JSON
app.use(express.json());

// ✅ Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Verificar conexión a la base de datos
pool.query('SELECT 1')
  .then(() => console.log('✅ Conectado a la base de datos'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Usar las rutas
app.use('/usuarios', usuariosRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
