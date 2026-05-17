// ================================================================
 // productos.model.js — Datos en memoria para la entidad Producto
 // ================================================================

 // 'Base de datos' en memoria — array de objetos producto
 let productos = [
 {
 id: 'prod-001',
 nombre: 'Airpods',
 descripcion: 'Cancelación de ruido, ademas tienen un excelente sonido',
 precio: 450000, // En pesos colombianos (COP)
 stock: 120, // Unidades disponibles
 categoria: 'Audifonos',
 activo: true,
 creadoEn: '2026-01-10T08:00:00.000Z'
 },
 {
 id: 'prod-002',
 nombre: 'Portatil Asus TUF Gaming',
 descripcion: 'Excelente rendimiento para programadores',
 precio: 8000000,
 stock: 50,
 categoria: 'Portatil',
 activo: true,
 creadoEn: '2026-01-12T09:30:00.000Z'
 }
 ];

 // Contador para generar IDs únicos secuenciales
 let contador = productos.length + 1;
 const generarId = () => {
 const id = `prod-${String(contador).padStart(3,'0')}`;
 contador++;
 return id;
 };

 // Funciones que expone el modelo (su 'API interna')
 module.exports = {
 getAll: () => [...productos], // Copia del array
 getById: (id) => productos.find(p => p.id === id), // undefined si no existe
 getByCategoria: (cat) => productos.filter(p => p.categoria === cat),

 create: (datos) => { // Crea y agrega
 const nuevo = {
 id: generarId(),
 nombre: datos.nombre,
 descripcion: datos.descripcion || '',
 precio: Number(datos.precio),
 stock: Number(datos.stock) || 0,
 categoria: datos.categoria || 'general',
 activo: true,
 creadoEn: new Date().toISOString()
 };
 productos.push(nuevo);
 return nuevo;
 },

 update: (id, cambios) => { // Actualiza campos
 const i = productos.findIndex(p => p.id === id);
 if (i === -1) return null; // No existe
 const { id:_id, creadoEn:_c, ...permitidos } = cambios; // Campos protegidos
 productos[i] = { ...productos[i], ...permitidos };
 return productos[i];
 },

 softDelete: (id) => { // Desactiva (no borra)
 const i = productos.findIndex(p => p.id === id);
 if (i === -1) return null;
 productos[i].activo = false;
 return productos[i];
 }
 };