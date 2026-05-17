// ================================================================
// pedidos.routes.js — Rutas de la entidad Pedido
// ================================================================

const router = require('express').Router();
const PedidoController = require('../controllers/pedidos.controller');
const { validarPedido } = require('../middlewares/validacion');

router.get('/',              PedidoController.listar);
router.get('/:id',           PedidoController.obtener);
router.post('/',  validarPedido, PedidoController.crear);
router.put('/:id/estado',    PedidoController.actualizarEstado);
router.delete('/:id',        PedidoController.cancelar);

module.exports = router;