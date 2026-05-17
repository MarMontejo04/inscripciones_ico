import Grupo from "../models/Grupo.js";

// GET todos los grupos
export const getGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.findAll();
    res.json(grupos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener grupos", error });
  }
};

// GET un grupo
export const getGrupo = async (req, res) => {
  try {
    const grupo = await Grupo.findByPk(req.params.id);
    if (!grupo) return res.status(404).json({ mensaje: "Grupo no encontrado" });
    res.json(grupo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el grupo", error });
  }
};

// POST crear grupo
export const crearGrupo = async (req, res) => {
  try {
    const grupo = await Grupo.create(req.body);
    res.status(201).json(grupo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear grupo", error });
  }
};

// PUT actualizar grupo
export const actualizarGrupo = async (req, res) => {
  try {
    const grupo = await Grupo.findByPk(req.params.id);
    if (!grupo) return res.status(404).json({ mensaje: "Grupo no encontrado" });
    await grupo.update(req.body);
    res.json(grupo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar grupo", error });
  }
};

// DELETE eliminar grupo
export const eliminarGrupo = async (req, res) => {
  try {
    const grupo = await Grupo.findByPk(req.params.id);
    if (!grupo) return res.status(404).json({ mensaje: "Grupo no encontrado" });
    await grupo.destroy();
    res.json({ mensaje: "Grupo eliminado correctamente" });
  } catch (error) {
    if (error.original?.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(409).json({
        mensaje: "No se puede eliminar el grupo porque tiene registros asignados."
      });
    }
    res.status(500).json({ mensaje: "Error al eliminar grupo", error });
  }
};