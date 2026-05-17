// ================================================================
// pagos.model.js — Datos en memoria para la entidad Pago PSE
// ================================================================

const BANCOS = {
  '1007': 'Bancolombia',
  '1006': 'Banco de Bogotá',
  '1009': 'Citibank Colombia',
  '1013': 'BBVA Colombia',
  '1040': 'Banco Agrario',
  '1051': 'Davivienda',
  '1023': 'Banco de Occidente'
};

let pagos = [];
let contadorPago = 1;

//Genera referencia única para trazabilidad de la transacción electrónica
const generarReferencia = () => {
  const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // '20260517'
  const seq   = String(contadorPago).padStart(4, '0');                   // '0001'
  contadorPago++;
  return `TXN-${fecha}-${seq}`; // → 'TXN-20260517-0001'
};

module.exports = {
  getBanco: (codigo) => BANCOS[codigo],

  getByReferencia: (ref) => pagos.find(p => p.referencia === ref),

  create: (datos) => {
    const nuevoPago = {
      referencia:       generarReferencia(),        //trazabilidad única
      pedidoId:         datos.pedidoId,
      bancoCodigo:      datos.bancoCodigo,
      banco:            BANCOS[datos.bancoCodigo],
      tipoPersona:      datos.tipoPersona,
      tipoDocumento:    datos.tipoDocumento,
      numeroDocumento:  datos.numeroDocumento,
      monto:            Number(datos.monto),
      descripcion:      datos.descripcion || 'Compra tienda Coquito Amarillo',
      urlRespuesta:     datos.urlRespuesta,         //URL de retorno obligatoria
      estado:           'PENDIENTE',
      creadaEn:         new Date().toISOString()    //Fecha actual automática
    };
    pagos.push(nuevoPago);
    return nuevoPago;
  },

  updateEstado: (referencia, nuevoEstado) => {
    const i = pagos.findIndex(p => p.referencia === referencia);
    if (i === -1) return null;
    pagos[i].estado = nuevoEstado;
    return pagos[i];
  }
};