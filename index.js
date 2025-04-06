const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tareas_habitos_pro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // Para PUT y DELETE en formularios

// Configurar cabeceras de seguridad básicas
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Importar rutas
const taskRoutes = require('./routes/tasks');
const habitRoutes = require('./routes/habits');
const userRoutes = require('./routes/users');

// Middleware para pasar variables globales a las vistas
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// Usar rutas
app.use('/tasks', taskRoutes);
app.use('/habits', habitRoutes);
app.use('/users', userRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.render('pages/home', { 
    title: 'Inicio',
    message: 'Bienvenido a la aplicación de Tareas y Hábitos'
  });
});

// Ruta de búsqueda de hábitos
app.get('/habitSearch', (req, res) => {
  res.render('pages/habitSearch', {
    title: 'Buscar Hábitos'
  });
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render('pages/error', {
    title: 'Error 404',
    message: 'Página no encontrada'
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', {
    title: 'Error',
    message: 'Ha ocurrido un error en el servidor'
  });
});

// Crear carpeta public si no existe
const fs = require('fs');
const publicPath = path.join(__dirname, 'public');
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath);
  fs.mkdirSync(path.join(publicPath, 'css'));
  fs.mkdirSync(path.join(publicPath, 'js'));
  fs.mkdirSync(path.join(publicPath, 'images'));
}

// Crear archivo CSS básico si no existe
const cssPath = path.join(publicPath, 'css', 'styles.css');
if (!fs.existsSync(cssPath)) {
  const basicCSS = `
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    
    .container {
      width: 90%;
      margin: auto;
      padding: 20px;
    }
    
    .navbar {
      background: #333;
      color: white;
      padding: 1rem;
    }
    
    .navbar a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
    }
    
    .navbar a:hover {
      background: #555;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn-primary {
      background: #007bff;
      color: white;
    }
    
    .btn-danger {
      background: #dc3545;
      color: white;
    }
    
    .alert {
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 4px;
    }
    
    .alert-error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
  `;
  fs.writeFileSync(cssPath, basicCSS);
}

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Presiona Ctrl + C para detener el servidor`);
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('Cerrando servidor...');
  mongoose.connection.close(() => {
    console.log('Conexión a MongoDB cerrada');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Cerrando servidor...');
  mongoose.connection.close(() => {
    console.log('Conexión a MongoDB cerrada');
    process.exit(0);
  });
});