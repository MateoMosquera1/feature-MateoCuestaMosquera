// ================================================================
// pedidos.controller.js — Lógica HTTP de la entidad Pedido
// ================================================================

const PedidoModel = require('../models/pedidos.model');

const PedidoController = {

  // GET /api/pedidos = Lista todos (opcional: ?estado=pendiente)
  listar: (req, res) => {
    let lista = PedidoModel.getAll();
    if (req.query.estado)
      lista = lista.filter(p => p.estado === req.query.estado);
    res.status(200).json({ total: lista.length, pedidos: lista });
  },

  // GET /api/pedidos/:id = Obtiene uno por id
  obtener: (req, res) => {
    const pedido = PedidoModel.getById(req.params.id);
    if (!pedido)
      return res.status(404).json({ error: `Pedido '${req.params.id}' no encontrado` });
    res.status(200).json(pedido);
  },

  // POST /api/pedidos = Crea un pedido (total se calcula automático)
  crear: (req, res) => {
    const nuevo = PedidoModel.create(req.body);
    res.status(201)
      .location(`/api/pedidos/${nuevo.id}`)
      .json({ mensaje: 'Pedido creado', pedido: nuevo });
  },

  // PUT /api/pedidos/:id/estado = Cambia solo el estado
  actualizarEstado: (req, res) => {
    const estadosValidos = ['pendiente', 'confirmado', 'entregado', 'cancelado'];
    const { estado } = req.body;
    if (!estadosValidos.includes(estado))
      return res.status(400).json({ error: `Estado inválido. Use: ${estadosValidos.join(', ')}` });
    const actualizado = PedidoModel.updateEstado(req.params.id, estado);
    if (!actualizado)
      return res.status(404).json({ error: `Pedido '${req.params.id}' no encontrado` });
    res.status(200).json({ mensaje: 'Estado actualizado', pedido: actualizado });
  },

  // DELETE /api/pedidos/:id = Cancela el pedido (soft delete)
  cancelar: (req, res) => {
    const resultado = PedidoModel.cancelar(req.params.id);
    if (!resultado)
      return res.status(404).json({ error: `Pedido '${req.params.id}' no encontrado` });
    res.status(204).send();
  }
};

module.exports = PedidoController;