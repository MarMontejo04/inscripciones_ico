import Inscripcion from "../models/Inscripcion.js";
import Clase from "../models/Clase.js";
import Alumno from "../models/Alumno.js";
import Asignatura from "../models/Asignatura.js";
import Profesor from "../models/Profesor.js";
import Grupo from "../models/Grupo.js";
import { Op } from "sequelize";

// Helper: recarga clases con sus relaciones
const cargarClases = async (id_alumno = null) => {

  let whereClase = {};

  // Si hay alumno, excluir materias ya inscritas
  if (id_alumno) {

    // Obtener inscripciones activas
    const inscritas = await Inscripcion.findAll({
      where: {
        id_alumno,
        inscrita: true
      },
      include: [
        {
          model: Clase
        }
      ]
    });

    // Obtener claves de materias ya inscritas
    // Obtener ids de clases ya inscritas
    const idsClasesInscritas =
      inscritas.map(i => i.id_clase);

    whereClase = {
      id_clase: {
        [Op.notIn]: idsClasesInscritas
      }
    };
  }

  return await Clase.findAll({
    where: whereClase,

    include: [
      {
        model: Asignatura,
        attributes: [
          "nombre_asignatura",
          "creditos",
          "semestre",
          "optativa"
        ]
      },
      {
        model: Profesor,
        attributes: [
          "nombre",
          "ap_paterno"
        ]
      },
      {
        model: Grupo,
        as: "grupoClase",
        attributes: ["num_grupo"]
      },
    ],
  });
};

// GET /inscripciones
export const mostrarFormulario = async (req, res) => {

  try {

    const clases = await cargarClases();

    return res.render("inscripcion/index", {
      clases,
      error: null,
      exito: null
    });

  } catch (error) {

    console.error(error);

    return res.status(500).send(
      "Error al cargar las clases"
    );
  }
};

// POST /inscripciones — Procesa inscripción de múltiples materias
export const inscribir = async (req, res) => {
  const { id_alumno, clases_inscritas, semestre_curso } = req.body;
  console.log(req.body);
  console.log("clases_inscritas:", clases_inscritas);
  // Normalizar: acepta "id1,id2,id3" o array
  const idsRaw = Array.isArray(clases_inscritas)
    ? clases_inscritas
    : String(clases_inscritas || "").split(",").map(s => s.trim()).filter(Boolean);

  const ids_clase = idsRaw.map(Number);

  // Validar que se seleccionó al menos una materia
  if (ids_clase.length === 0) {

    const clases = await cargarClases();

    return res.render("inscripcion/inscripciones", {
      alumno: { id_alumno },
      clasesAgrupadas: {},
      clases,
      error: "Debes seleccionar al menos una materia.",
      exito: null,
    });
  }

  try {
    // Verificar que el alumno existe
    const alumno = await Alumno.findOne({ where: { id_alumno } });

    if (!alumno) {

      const clases = await cargarClases();

      return res.render("inscripcion/inscripciones", {
        alumno: { id_alumno },
        clasesAgrupadas: {},
        clases,
        error: "Alumno no encontrado.",
        exito: null,
      });
    }

        // Obtener clases seleccionadas
    const clasesSeleccionadas = await Clase.findAll({
      where: {
        id_clase: ids_clase
      }
    });

    // Obtener claves de materias
    const clavesMateriasSeleccionadas =
      clasesSeleccionadas.map(c => c.clave_materia);
    

    // Verificar duplicados: solo bloquea si inscrita = true (activa)
    const yaInscritas = await Inscripcion.findAll({
      where: {
        id_alumno: alumno.id_alumno,
        inscrita: true,
      },
      include: [
        {
          model: Clase,
          where: {
            clave_materia: {
              [Op.in]: clavesMateriasSeleccionadas
            }
          }
        }
      ]
    });

    if (yaInscritas.length > 0) {

      const clases = await cargarClases(alumno.id_alumno);

      const nombresRepetidos =
        yaInscritas.map(i => `clase #${i.id_clase}`).join(", ");

      return res.render("inscripcion/inscripciones", {
        alumno,
        clasesAgrupadas: {},
        clases,
        error:
          `Ya estás inscrito en: ${nombresRepetidos}.`,
        exito: null,
      });
    }

    // Crear inscripciones con inscrita = true
    const fechaHoy = new Date();
    await Promise.all(
      ids_clase.map(id_clase =>
        Inscripcion.create({
          id_alumno:         alumno.id_alumno,
          id_clase,
          semestre_curso:    semestre_curso || "",
          fecha_inscripcion: fechaHoy,
          inscrita:          true,
        })
      )
    );

  // Obtener materias inscritas
  const materias = await Inscripcion.findAll({
    where: {
      id_alumno: alumno.id_alumno,
      inscrita: true
    },
    include: [
      {
        model: Clase,
        include: [
          {
            model: Asignatura
          },
          {
            model: Profesor
          },
          {
            model: Grupo,
            as: "grupoClase"
          }
        ]
      }
    ]
  });

  return res.render("inscripcion/mis_materias", {
    alumno,
    materias,
    error: null,
    exito:
      `Inscripción exitosa: ${ids_clase.length} materia${ids_clase.length !== 1 ? "s" : ""} inscritas.`,
  });
     } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar la inscripción");
  }
};