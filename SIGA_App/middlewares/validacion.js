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
    errores.push(`tipoDoc es requerido. Valores válidos: ${tiposValidos.join(', ')}`);
 
  if (!numDoc || numDoc.toString().trim().length < 5)
    errores.push('numDoc es requerido (mínimo 5 caracteres)');
 
  if (!nombres || nombres.trim().length < 2)
    errores.push('nombres es requerido (mínimo 2 caracteres)');
 
  if (!apellidos || apellidos.trim().length < 2)
    errores.push('apellidos es requerido (mínimo 2 caracteres)');
 
  if (!email || !email.includes('@') || !email.includes('.'))
    errores.push('email válido es requerido');
 
  if (!telefono || telefono.trim().length < 7)
    errores.push('telefono es requerido (mínimo 7 caracteres)');
 
  if (errores.length > 0)
    return res.status(400).json({
      mensaje: 'Datos inválidos',
      errores,
      nota: 'El tratamiento de datos personales se rige por la Ley 1581 de 2012.'
    });
 
  next();
};
const validarPago = (req, res, next) => {
  const {
    pedidoId, bancoCodigo, tipoPersona,
    tipoDocumento, numeroDocumento, monto, urlRespuesta
  } = req.body;
  const errores = [];
 
  const bancosValidos  = ['1007', '1006', '1009', '1013', '1040', '1051', '1023'];
  const tiposPersona   = ['N', 'J'];
  const tiposDocumento = ['CC', 'CE', 'NIT', 'PA'];
 
  if (!pedidoId)
    errores.push('pedidoId es requerido');
 
  //El banco debe ser una entidad reconocida en el sistema ACH Colombia
  if (!bancoCodigo || !bancosValidos.includes(bancoCodigo))
    errores.push(`bancoCodigo inválido. Bancos disponibles: ${bancosValidos.join(', ')}`);
 
  if (!tipoPersona || !tiposPersona.includes(tipoPersona))
    errores.push('tipoPersona debe ser N (Natural) o J (Jurídica)');
 
  if (!tipoDocumento || !tiposDocumento.includes(tipoDocumento))
    errores.push(`tipoDocumento inválido. Use: ${tiposDocumento.join(', ')}`);
 
  if (!numeroDocumento)
    errores.push('numeroDocumento es requerido');
 
  if (!monto || isNaN(Number(monto)) || Number(monto) <= 0)
    errores.push('monto debe ser un número mayor a 0 (en pesos COP)');
 
  // urlRespuesta obligatoria con HTTPS para garantizar
  // el retorno seguro del resultado de la transacción al comercio
  if (!urlRespuesta || !urlRespuesta.startsWith('https://'))
    errores.push('urlRespuesta es requerida y debe usar HTTPS (Ley 527 de 1999, Art. 12)');
 
  if (errores.length > 0)
    return res.status(400).json({
      mensaje: 'Datos inválidos',
      errores,
      nota: 'Las transacciones electrónicas se rigen por la Ley 527 de 1999 de Colombia.'
    });
 
  next();
};
 

 // ── TAREA: Crea validarPedido, validarPersona y validarPago ──────────────
 // Sigue el mismo patrón: define qué campos son requeridos para cada entidad
 // y agrégalos al módulo.exports al final.

 module.exports = {  validarProducto, validarPedido, validarPersona, validarPago  }; // TODO: agregar los demás validadores
 