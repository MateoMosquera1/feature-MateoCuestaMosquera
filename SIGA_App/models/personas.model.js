// ================================================================
// personas.model.js — Datos en memoria para la entidad Persona
// ================================================================

let personas = [
  {
    id: 'per-001',
    tipoDoc: 'CC',
    numDoc: '1023456789',
    nombres: 'Carlos Andrés',
    apellidos: 'Mejía Restrepo',
    email: 'ca.mejia@gmail.com',
    telefono: '+573001234567',
    ciudad: 'Medellín',
    activo: true,
    creadoEn: new Date().toISOString() //Fecha actual automática
  },
  {
    id: 'per-002',
    tipoDoc: 'CC',
    numDoc: '9876543210',
    nombres: 'Laura Sofía',
    apellidos: 'Torres Gómez',
    email: 'l.torres@gmail.com',
    telefono: '+573109876543',
    ciudad: 'Bogotá',
    activo: true,
    creadoEn: new Date().toISOString() //Fecha actual automática
  }
];

let contador = personas.length + 1;

const generarId = () => {
  const id = `per-${String(contador).padStart(3, '0')}`;
  contador++;
  return id;
};

//Enmascarar datos sensibles en listados
const enmascarar = (p) => ({
  ...p,
  numDoc:   '****' + p.numDoc.slice(-4),                    // Solo últimos 4 dígitos
  email:    p.email.replace(/(.{2}).+(@.+)/, '$1***$2'),    // ca***@gmail.com
  telefono: '****' + p.telefono.slice(-4)                   // Solo últimos 4 dígitos
});

module.exports = {
  // Listado siempre con datos enmascarados
  getAll: () => personas.map(enmascarar),

  //Datos completos solo en consulta individual autorizada
  getById: (id) => personas.find(p => p.id === id),

  existeNumDoc: (numDoc) => personas.some(p => p.numDoc === numDoc),
  existeEmail:  (email)  => personas.some(p => p.email  === email),

  create: (datos) => {
    const nueva = {
      id: generarId(),
      tipoDoc:   datos.tipoDoc,
      numDoc:    datos.numDoc,
      nombres:   datos.nombres,
      apellidos: datos.apellidos,
      email:     datos.email,
      telefono:  datos.telefono,
      ciudad:    datos.ciudad || '',
      activo:    true,
      creadoEn:  new Date().toISOString() // Fecha actual automática
    };
    personas.push(nueva);
    return nueva;
  },

  update: (id, cambios) => {
    const i = personas.findIndex(p => p.id === id);
    if (i === -1) return null;
    // id, numDoc y creadoEn son campos protegidos, no se pueden modificar
    const { id: _id, numDoc: _nd, creadoEn: _c, ...permitidos } = cambios;
    personas[i] = { ...personas[i], ...permitidos };
    return personas[i];
  },

  softDelete: (id) => {
    const i = personas.findIndex(p => p.id === id);
    if (i === -1) return null;
    personas[i].activo = false;
    return personas[i];
  }
};