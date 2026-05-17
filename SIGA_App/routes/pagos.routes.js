// ================================================================
// pagos.routes.js — Rutas de la entidad Pagos
// ================================================================

const router = require('express').Router();
const PagoController = require('../controllers/pagos.controller');
const { validarPago } = require('../middlewares/validacion');
 
// Método   │ Ruta                        │ Middleware   │ Controlador
// ─────────┼─────────────────────────────┼──────────────┼──────────────────────
router.post ('/',                           validarPago, PagoController.iniciar);
router.get  ('/:referencia',                PagoController.consultar);
router.put  ('/:referencia/estado',         PagoController.actualizarEstado);
 
module.exports = router;