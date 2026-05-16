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

 // ── TAREA: Crea validarPedido, validarPersona y validarPago ──────────────
 // Sigue el mismo patrón: define qué campos son requeridos para cada entidad
 // y agrégalos al módulo.exports al final.

 module.exports = { validarProducto }; // TODO: agregar los demás validadores