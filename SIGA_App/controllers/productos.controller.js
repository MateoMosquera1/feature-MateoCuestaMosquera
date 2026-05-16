// ================================================================
 // productos.controller.js — Lógica HTTP de la entidad Producto
 // ================================================================

 const ProductoModel = require('../models/productos.model');

 const ProductoController = {

 // GET /api/productos → Lista todos (o filtra por ?categoria=...)
 listar: (req, res) => {
 let lista = ProductoModel.getAll();
 if (req.query.categoria) // Filtro opcional por URL
 lista = lista.filter(p => p.categoria === req.query.categoria);
 res.status(200).json({ total: lista.length, productos: lista });
 },

 // GET /api/productos/:id → Obtiene uno por id
 obtener: (req, res) => {
 const producto = ProductoModel.getById(req.params.id);
 if (!producto) // Si no existe → 404
 return res.status(404).json({ error: `Producto '${req.params.id}' no encontrado`
});
 res.status(200).json(producto); // Existe → 200
 },

 // POST /api/productos → Crea un producto nuevo
 crear: (req, res) => {
 const nuevo = ProductoModel.create(req.body); // El modelo asigna el id
 res.status(201) // 201 Created
 .location(`/api/productos/${nuevo.id}`) // Header Location
 .json({ mensaje: 'Producto creado', producto: nuevo });
 },

 // PUT /api/productos/:id → Actualiza campos (parcial)
 actualizar: (req, res) => {
 const actualizado = ProductoModel.update(req.params.id, req.body);
 if (!actualizado)
 return res.status(404).json({ error: `Producto '${req.params.id}' no encontrado`
});
 res.status(200).json({ mensaje: 'Producto actualizado', producto: actualizado });
 },

 // DELETE /api/productos/:id → Desactiva (soft delete)
 eliminar: (req, res) => {
 const resultado = ProductoModel.softDelete(req.params.id);
 if (!resultado)
 return res.status(404).json({ error: `Producto '${req.params.id}' no encontrado`
});
 res.status(204).send(); // 204: éxito sin cuerpo de respuesta
 }
 };

 module.exports = ProductoController;