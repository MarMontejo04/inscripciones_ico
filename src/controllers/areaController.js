import Area from "../models/Area.js";

// GET todas las áreas
export const getAreas = async (req, res) => {
  try {
    const areas = await Area.findAll();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener áreas", error });
  }
};

export const getArea = async (req, res) => {
  try {
    const area = await Area.findByPk(req.params.id);

    if (!area) {
      return res.status(404).json({ mensaje: "Área no encontrada" });
    }

    res.json(area);

  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener área", error });
  }
};

export const crearArea = async (req, res) => {
  try {
    const area = await Area.create(req.body);
    res.status(201).json(area);

  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear área", error });
  }
};

// PUT actualizar área
export const actualizarArea = async (req, res) => {
  try {
    const area = await Area.findByPk(req.params.id);

    if (!area) {
      return res.status(404).json({ mensaje: "Área no encontrada" });
    }

    await area.update(req.body);

    res.json(area);

  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar área", error });
  }
};

// DELETE eliminar área
export const eliminarArea = async (req, res) => {
  try {
    const area = await Area.findByPk(req.params.id);

    if (!area) {
      return res.status(404).json({ mensaje: "Área no encontrada" });
    }

    await area.destroy();

    res.json({ mensaje: "Área eliminada correctamente" });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar área porque tiene registros asignados",
      error
    });
  }
};