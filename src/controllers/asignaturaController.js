import Asignatura from "../models/Asignatura.js";

// GET todas las asignaturas
export const getAsignaturas = async (req, res) => {
  try {
    const asignaturas = await Asignatura.findAll();
    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener asignaturas", error });
  }
};

// GET una asignatura
export const getAsignatura = async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.id);
    if (!asignatura) return res.status(404).json({ mensaje: "Asignatura no encontrada" });
    res.json(asignatura);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la asignatura", error });
  }
};

// POST crear asignatura
export const crearAsignatura = async (req, res) => {
  try {
    const asignatura = await Asignatura.create(req.body);
    res.status(201).json(asignatura);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear asignatura", error });
  }
};

// PUT actualizar asignatura
export const actualizarAsignatura = async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.id);
    if (!asignatura) return res.status(404).json({ mensaje: "Asignatura no encontrada" });
    await asignatura.update(req.body);
    res.json(asignatura);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar asignatura", error });
  }
};

// DELETE eliminar asignatura
export const eliminarAsignatura = async (req, res) => {
  try {
    const asignatura = await Asignatura.findByPk(req.params.id);
    if (!asignatura) return res.status(404).json({ mensaje: "Asignatura no encontrada" });
    await asignatura.destroy();
    res.json({ mensaje: "Asignatura eliminada correctamente" });
  } catch (error) {
    if (error.original?.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        mensaje: "No se puede eliminar la asignatura porque tiene clases asignadas."
      });
    }
    res.status(500).json({ mensaje: "Error al eliminar asignatura", error });
  }
};