import Alumno from "../models/Alumno.js";

// GET todos los alumnos
export const getAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.findAll({
      attributes: { exclude: ["password", "pregunta_secreta", "respuesta_secreta"] }
    });
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener alumnos", error });
  }
};

export const getAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findByPk(req.params.id, {
      attributes: { exclude: ["password", "pregunta_secreta", "respuesta_secreta"] }
    });
    if (!alumno) return res.status(404).json({ mensaje: "Alumno no encontrado" });
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener alumno", error });
  }
};

export const crearAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.create(req.body);
    res.status(201).json(alumno);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear alumno", error });
  }
};

// PUT actualizar alumno
export const actualizarAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findByPk(req.params.id);
    if (!alumno) return res.status(404).json({ mensaje: "Alumno no encontrado" });
    await alumno.update(req.body);
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar alumno", error });
  }
};

// DELETE eliminar alumno
export const eliminarAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findByPk(req.params.id);
    if (!alumno) return res.status(404).json({ mensaje: "Alumno no encontrado" });
    await alumno.destroy();
    res.json({ mensaje: "Alumno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar alumno porque está inscrito", error });
  }
};