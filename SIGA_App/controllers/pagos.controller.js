// ================================================================
// pagos.controller.js — Lógica HTTP del módulo Pago PSE
// ================================================================

const PagoModel = require('../models/pagos.model');

const PagoController = {

  // POST /api/pagos-pse → Inicia una transacción PSE (simulada)
  //El acuse de recibo confirma la transacción electrónica
  iniciar: (req, res) => {
    const pago = PagoModel.create(req.body);

    res.status(200).json({
      mensaje: 'Transacción iniciada. Redirigir al banco.',
      //Trazabilidad completa de la transacción electrónica
      referencia:   pago.referencia,
      estado:       pago.estado,
      banco:        pago.banco,
      monto:        pago.monto,
      descripcion:  pago.descripcion,
      urlRespuesta: pago.urlRespuesta,
      creadaEn:     pago.creadaEn,
      aviso: 'Esta transacción tiene validez legal según la Ley 527 de 1999 de comercio electrónico de Colombia.'
    });
  },

  // GET /api/pagos-pse/:referencia → Consulta estado de una transacción
  //Permite verificar integridad y estado del mensaje electrónico
  consultar: (req, res) => {
    const pago = PagoModel.getByReferencia(req.params.referencia);
    if (!pago)
      return res.status(404).json({
        error: `Transacción '${req.params.referencia}' no encontrada`
      });
    res.status(200).json(pago);
  },

  // PUT /api/pagos-pse/:referencia/estado → Simula APROBADO o RECHAZADO
  //Actualización del acuse de recibo con el resultado final
  actualizarEstado: (req, res) => {
    const estadosValidos = ['APROBADO', 'RECHAZADO'];
    const { estado } = req.body;

    if (!estado || !estadosValidos.includes(estado))
      return res.status(400).json({
        error: `Estado inválido. Use: ${estadosValidos.join(' o ')}`
      });

    const actualizado = PagoModel.updateEstado(req.params.referencia, estado);
    if (!actualizado)
      return res.status(404).json({
        error: `Transacción '${req.params.referencia}' no encontrada`
      });

    res.status(200).json({
      mensaje: `Transacción ${estado}`,
      //el resultado queda registrado con trazabilidad completa
      pago: actualizado
    });
  }
};

module.exports = PagoController;