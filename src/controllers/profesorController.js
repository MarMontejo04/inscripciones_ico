import Profesor from "../models/Profesor.js";

// GET todos los profesores
export const getProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.findAll();
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener profesores", error });
  }
};

// GET un profesor
export const getProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (!profesor) return res.status(404).json({ mensaje: "Profesor no encontrado" });
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener profesor", error });
  }
};

// POST crear profesor
export const crearProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.create(req.body);
    res.status(201).json(profesor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear profesor", error });
  }
};

// PUT actualizar profesor
export const actualizarProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (!profesor) return res.status(404).json({ mensaje: "Profesor no encontrado" });
    await profesor.update(req.body);
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar profesor", error });
  }
};

// DELETE eliminar profesor
export const eliminarProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (!profesor) return res.status(404).json({ mensaje: "Profesor no encontrado" });
    await profesor.destroy();
    res.json({ mensaje: "Profesor eliminado correctamente" });
  } catch (error) {
    // Error de llave foránea (MySQL error 1451)
    if (error.original?.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        mensaje: "No se puede eliminar el profesor porque tiene clases asignadas."
      });
    }
    res.status(500).json({ mensaje: "Error al eliminar profesor", error });
  }
};