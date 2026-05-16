// ================================================================
 // productos.routes.js — Rutas de la entidad Producto
 // ================================================================

 const router = require('express').Router();
 const ProductoController = require('../controllers/productos.controller');
 const { validarProducto } = require('../middlewares/validacion');

 // Método │ Ruta │ Middleware │ Controlador
 // ────────┼────────────────────┼───────────────────┼────────────────────
 router.get ('/', ProductoController.listar); // Sin validador GET
 router.get ('/:id', ProductoController.obtener); // Sin validador GET
 router.post ('/', validarProducto, ProductoController.crear); // Con validador
 router.put ('/:id', validarProducto, ProductoController.actualizar);
 router.delete('/:id', ProductoController.eliminar);

 module.exports = router;

 // En app.js se monta así:
 // app.use('/api/productos', productosRouter);
 // Esto hace que router.get('/') responda a GET /api/productos
 // y router.get('/:id') responda a GET /api/pro