// ================================================================
// personas.controller.js — Lógica HTTP de la entidad Persona
// ================================================================

const PersonaModel = require('../models/personas.model');

const PersonaController = {

  // GET /api/personas → Lista todas (opcional: ?activo=true|false)
  //numDoc, email y telefono enmascarados en listados
  listar: (req, res) => {
    let lista = PersonaModel.getAll(); // getAll() ya aplica enmascaramiento
    if (req.query.activo !== undefined)
      lista = lista.filter(p => p.activo === (req.query.activo === 'true'));
    res.status(200).json({ total: lista.length, personas: lista });
  },

  // GET /api/personas/:id → Datos completos (solo en consulta individual)
  // Derecho de acceso: datos completos solo por ID
  obtener: (req, res) => {
    const persona = PersonaModel.getById(req.params.id);
    if (!persona)
      return res.status(404).json({ error: `Persona '${req.params.id}' no encontrada` });
    res.status(200).json(persona);
  },

  // POST /api/personas → Registrar cliente
  //Evitar circulación innecesaria de datos sensibles en la respuesta
  crear: (req, res) => {
    if (PersonaModel.existeNumDoc(req.body.numDoc))
      return res.status(409).json({ error: 'El número de documento ya está registrado' });
    if (PersonaModel.existeEmail(req.body.email))
      return res.status(409).json({ error: 'El email ya está registrado' });

    const nueva = PersonaModel.create(req.body);

    //no devolver numDoc, email ni telefono completos en la respuesta de creación
    const { numDoc, email, telefono, ...resto } = nueva;
    res.status(201)
      .location(`/api/personas/${nueva.id}`)
      .json({
        mensaje: 'Persona registrada. Sus datos están protegidos bajo la Ley 1581 de 2012.',
        persona: {
          ...resto,
          numDoc:   '****' + numDoc.slice(-4),
          email:    email.replace(/(.{2}).+(@.+)/, '$1***$2'),
          telefono: '****' + telefono.slice(-4)
        }
      });
  },

  // PUT /api/personas/:id → Actualizar datos del cliente
  //numDoc protegido, no se permite modificar
  actualizar: (req, res) => {
    const actualizada = PersonaModel.update(req.params.id, req.body);
    if (!actualizada)
      return res.status(404).json({ error: `Persona '${req.params.id}' no encontrada` });

    //enmascarar en respuesta de actualización también
    const { numDoc, email, telefono, ...resto } = actualizada;
    res.status(200).json({
      mensaje: 'Persona actualizada',
      persona: {
        ...resto,
        numDoc:   '****' + numDoc.slice(-4),
        email:    email.replace(/(.{2}).+(@.+)/, '$1***$2'),
        telefono: '****' + telefono.slice(-4)
      }
    });
  },

  // DELETE /api/personas/:id → Soft delete (activo = false)
  // No se eliminan físicamente los datos, solo se desactivan
  eliminar: (req, res) => {
    const resultado = PersonaModel.softDelete(req.params.id);
    if (!resultado)
      return res.status(404).json({ error: `Persona '${req.params.id}' no encontrada` });
    res.status(204).send();
  }
};

module.exports = PersonaController;