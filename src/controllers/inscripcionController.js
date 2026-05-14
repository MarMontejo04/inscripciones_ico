import Inscripcion from "../models/Inscripcion.js";
import Clase from "../models/Clase.js";
import Alumno from "../models/Alumno.js";
import Asignatura from "../models/Asignatura.js";
import Profesor from "../models/Profesor.js";
import Grupo from "../models/Grupo.js";

export const mostrarFormulario = async (req, res) => {
  try {
    const clases = await Clase.findAll({
      include: [
        { model: Asignatura, attributes: ["nombre_asignatura", "creditos"] },
        { model: Profesor, attributes: ["nombre", "ap_paterno"] },
        { model: Grupo, as: "grupoClase", attributes: ["num_grupo"] },
      ],
    });

    res.render("inscripcion/index", { clases, error: null, exito: null });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar las clases");
  }
};

// POST /inscripciones - Procesa la inscripción
export const inscribir = async (req, res) => {
  const { id_alumno, id_clase, semestre_curso } = req.body;

  try {
    // Buscar alumno por número de cuenta
    const alumno = await Alumno.findOne({ where: { id_alumno } });

    if (!alumno) {
      const clases = await Clase.findAll({
        include: [
          { model: Asignatura, attributes: ["nombre_asignatura", "creditos"] },
          { model: Profesor, attributes: ["nombre", "ap_paterno"] },
          { model: Grupo, as: "grupoClase", attributes: ["num_grupo"] },
        ],
      });
      console.log("Clases encontradas:", clases.length);
      console.log(JSON.stringify(clases, null, 2));
      return res.render("inscripcion/index", {
        clases,
        error: "No se encontró ningún alumno con ese número de cuenta",
        exito: null,
      });
    }

    // Verificar si ya está inscrito en esa clase
    const yaInscrito = await Inscripcion.findOne({
      where: { id_alumno: alumno.id_alumno, id_clase },
    });

    if (yaInscrito) {
      const clases = await Clase.findAll({
        include: [
          { model: Asignatura, attributes: ["nombre_asignatura", "creditos"] },
          { model: Profesor, attributes: ["nombre", "ap_paterno"] },
          { model: Grupo,  as: "grupoClase", attributes: ["num_grupo"] },
        ],
      });
      return res.render("inscripcion/index", {
        clases,
        error: "Ya estás inscrito en esta clase",
        exito: null,
      });
    }

    // Crear inscripción
    await Inscripcion.create({
      id_alumno: alumno.id_alumno,
      id_clase,
      semestre_curso,
      fecha_inscripcion: new Date(),
    });

    const clases = await Clase.findAll({
      include: [
        { model: Asignatura, attributes: ["nombre_asignatura", "creditos"] },
        { model: Profesor, attributes: ["nombre", "ap_paterno"] },
        { model: Grupo, as: "grupoClase", attributes: ["num_grupo"] },
      ],
    });

    res.render("inscripcion/login", {
      clases,
      error: null,
      exito: `Inscripción exitosa para ${alumno.nombre} ${alumno.ap_paterno}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar la inscripción");
  }
};
