// ================================================================
 // app.js — Coquito Amarillo S.A.S. | API REST v1.0
 // Punto de entrada de la aplicación Express.
 // ================================================================

 // 1. Importar Express
 const express = require('express'); // Carga la librería Express
 const app = express(); // Crea la aplicación

 // 2. Middlewares globales — procesan TODA petición antes de llegar a las rutas
 app.use(express.json()); // Permite recibir JSON en el body
 app.use(express.urlencoded({ extended: true })); // Permite form-data

 app.use(express.static('public'));

 // 3. Importar routers (uno por entidad)
 const productosRouter = require('./routes/productos.routes');
 const pedidosRouter = require('./routes/pedidos.routes');
 const personasRouter = require('./routes/personas.routes');
 const pagosRouter = require('./routes/pagos.routes');
 // TODO: importar pedidosRouter, personasRouter, pseRouter

 // 4. Montar los routers con su prefijo de URL
 app.use('/api/productos', productosRouter);
 app.use('/api/pedidos', pedidosRouter);
 app.use('/api/personas', personasRouter);
 app.use('/api/pagos', pagosRouter);
 // TODO: montar los routers de pedidos, personas y pagos-pse

 // 5. Ruta raíz — saludo de la API
 app.get('/', (req, res) => {
 res.json({
 mensaje: '🥥 API Coquito Amarillo S.A.S. — Activa',
 version: '1.0.0',
 endpoints: ['/api/productos', '/api/pedidos',
 '/api/personas', '/api/pagos-pse']
 });
 });

 // 6. Middleware de manejo global de errores (DEBE ir al final)
 app.use((err, req, res, next) => {
 console.error('[ERROR]', err.message);
 res.status(err.status || 500).json({
 error: err.message || 'Error interno del servidor',
 codigo: err.status || 500
 });
 });

 // 7. Iniciar el servidor en el puerto 3000
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
 console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
 });

 module.exports = app; // Exportar para pruebas Jest