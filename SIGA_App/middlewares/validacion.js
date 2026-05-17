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
const validarPersona = (req, res, next) => {
  const { tipoDoc, numDoc, nombres, apellidos, email, telefono } = req.body;
  const errores = [];
  const tiposValidos = ['CC', 'CE', 'NIT', 'PA'];

  if (!tipoDoc || !tiposValidos.includes(tipoDoc))
    errores.push(`tipoDoc es requerido. Use: ${tiposValidos.join(', ')}`);
  if (!numDoc || numDoc.toString().trim().length < 5)
    errores.push('numDoc es requerido (mínimo 5 caracteres)');
  if (!nombres || nombres.trim().length < 2)
    errores.push('nombres es requerido');
  if (!apellidos || apellidos.trim().length < 2)
    errores.push('apellidos es requerido');
  if (!email || !email.includes('@'))
    errores.push('email válido es requerido');
  if (!telefono || telefono.trim().length < 7)
    errores.push('telefono es requerido');

  if (errores.length > 0)
    return res.status(400).json({ mensaje: 'Datos inválidos', errores });
  next();
};

 // ── TAREA: Crea validarPedido, validarPersona y validarPago ──────────────
 // Sigue el mismo patrón: define qué campos son requeridos para cada entidad
 // y agrégalos al módulo.exports al final.

 module.exports = {  validarProducto, validarPedido, validarPersona  }; // TODO: agregar los demás validadores
 