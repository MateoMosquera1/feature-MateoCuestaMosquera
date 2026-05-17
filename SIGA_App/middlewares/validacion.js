// ================================================================
 // validacion.js — Middlewares de validación de entrada
 // Un middleware es una función (req, res, next).
 // Si los datos son válidos llama next(); si no, responde con 400.
 // ================================================================

 const validarProducto = (req, res, next) => {
 const { nombre, precio } = req.body; // Campos mínimos requeridos
 const errores = [];

 if (!nombre || nombre.trim().length < 3)
 errores.push('nombre es requerido (mínimo 3 caracteres)');

 if (precio === undefined || isNaN(Number(precio)) || Number(precio) <= 0)
 errores.push('precio debe ser un número mayor a 0');

 if (errores.length > 0) // Si hay errores → responder 400
 return res.status(400).json({ mensaje: 'Datos inválidos', errores });

 next(); // Sin errores → continuar al controlador
 };
 const validarPedido = (req, res, next) => {
  const { clienteId, items, direccionEnvio } = req.body;
  const errores = [];

  if (!clienteId || clienteId.trim().length < 3)
    errores.push('clienteId es requerido');

  if (!Array.isArray(items) || items.length === 0)
    errores.push('items debe ser un array con al menos un producto');

  if (!direccionEnvio || direccionEnvio.trim().length < 5)
    errores.push('direccionEnvio es requerida');

  if (errores.length > 0)
    return res.status(400).json({ mensaje: 'Datos inválidos', errores });

  next();
};

 // ── TAREA: Crea validarPedido, validarPersona y validarPago ──────────────
 // Sigue el mismo patrón: define qué campos son requeridos para cada entidad
 // y agrégalos al módulo.exports al final.

 module.exports = {  validarProducto, validarPedido  }; // TODO: agregar los demás validadores
 