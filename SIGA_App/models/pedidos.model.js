// ================================================================
// pedidos.model.js — Datos en memoria para la entidad Pedido
// ================================================================

let pedidos = [
  {
    id: 'ped-001',
    clienteId: 'per-001',
    items: [
      { productoId: 'prod-001', cantidad: 2, precioUnitario: 4500 },
      { productoId: 'prod-002', cantidad: 1, precioUnitario: 8000 }
    ],
    total: 35000,
    estado: 'pendiente',
    direccionEnvio: 'Calle 10 #20-30, Medellín',
    creadoEn: new Date().toISOString()
  },
  {
    id: 'ped-002',
    clienteId: 'per-002',
    items: [
      { productoId: 'prod-001', cantidad: 3, precioUnitario: 4500 }
    ],
    total: 13500,
    estado: 'confirmado',
    direccionEnvio: 'Carrera 45 #12-10, Medellín',
    creadoEn: new Date().toISOString()
  }
];

let contador = pedidos.length + 1;
const generarId = () => {
  const id = `ped-${String(contador).padStart(3, '0')}`;
  contador++;
  return id;
};

module.exports = {
  getAll: () => [...pedidos],
  getById: (id) => pedidos.find(p => p.id === id),
  getByEstado: (estado) => pedidos.filter(p => p.estado === estado),

  create: (datos) => {
    const total = datos.items.reduce(
      (acc, item) => acc + item.cantidad * item.precioUnitario, 0
    );
    const nuevo = {
      id: generarId(),
      clienteId: datos.clienteId,
      items: datos.items,
      total,                          // Calculado automáticamente
      estado: 'pendiente',
      direccionEnvio: datos.direccionEnvio,
      creadoEn: new Date().toISOString() // Fecha actual automática
    };
    pedidos.push(nuevo);
    return nuevo;
  },

  updateEstado: (id, nuevoEstado) => {
    const i = pedidos.findIndex(p => p.id === id);
    if (i === -1) return null;
    pedidos[i].estado = nuevoEstado;
    return pedidos[i];
  },

  cancelar: (id) => {
    const i = pedidos.findIndex(p => p.id === id);
    if (i === -1) return null;
    pedidos[i].estado = 'cancelado';
    return pedidos[i];
  }
};