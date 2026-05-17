import Clase from "../models/Clase.js";

// GET todas las clases
export const getClases = async (req, res) => {
  try {
    const clases = await Clase.findAll();
    res.json(clases);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener clases", error });
  }
};

// GET una clase
export const getClase = async (req, res) => {
  try {
    const clase = await Clase.findByPk(req.params.id);
    if (!clase) return res.status(404).json({ mensaje: "Clase no encontrada" });
    res.json(clase);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la clase", error });
  }
};

// POST crear clase
export const crearClase = async (req, res) => {
  try {
    const clase = await Clase.create(req.body);
    res.status(201).json(clase);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear clase", error });
  }
};

// PUT actualizar clase
export const actualizarClase = async (req, res) => {
  try {
    const clase = await Clase.findByPk(req.params.id);
    if (!clase) return res.status(404).json({ mensaje: "Clase no encontrada" });
    await clase.update(req.body);
    res.json(clase);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar clase", error });
  }
};

// DELETE eliminar clase
export const eliminarClase = async (req, res) => {
  try {
    const clase = await Clase.findByPk(req.params.id);
    if (!clase) return res.status(404).json({ mensaje: "Clase no encontrada" });
    await clase.destroy();
    res.json({ mensaje: "Clase eliminada correctamente" });
  } catch (error) {
    if (error.original?.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        mensaje: "No se puede eliminar la clase porque tiene registros asignados."
      });
    }
    res.status(500).json({ mensaje: "Error al eliminar clase", error });
  }
};