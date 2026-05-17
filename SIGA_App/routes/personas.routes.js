// ================================================================
 // personas.routes.js — Rutas de la entidad Personas
 // ================================================================
const router = require('express').Router();
const PersonaController = require('../controllers/personas.controller');
const { validarPersona } = require('../middlewares/validacion');
 
// Método   │ Ruta    │ Middleware       │ Controlador
// ─────────┼─────────┼──────────────────┼──────────────────────
router.get    ('/',     PersonaController.listar);    // numDoc enmascarado (Ley 1581)
router.get    ('/:id',  PersonaController.obtener);   // numDoc completo solo aquí
router.post   ('/',  validarPersona, PersonaController.crear);
router.put    ('/:id', validarPersona, PersonaController.actualizar);
router.delete ('/:id',  PersonaController.eliminar);  // Soft delete (Ley 1581 Art. 9)
 
module.exports = router;