import Alumno from "../models/Alumno.js";
import Clase from "../models/Clase.js";
import Asignatura from "../models/Asignatura.js";
import Profesor from "../models/Profesor.js";
import Grupo from "../models/Grupo.js";
import Inscripcion from "../models/Inscripcion.js";
import { Op } from "sequelize";

const iniciarSesion = async (req, res) => {
  const { num_cuenta, password } = req.body;

  try {
    const alumno = await Alumno.findOne({ where: { num_cuenta } });

    if (!alumno) {
      return res.render("inscripcion/index", {
        error: "Número de cuenta no encontrado",
        exito: null,
      });
    }

    if (alumno.password !== password) {
      return res.render("inscripcion/index", {
        error: "Contraseña incorrecta",
        exito: null,
      });
    }

    // Obtener clases que el alumno ya tiene inscritas (inscrita = true)
    // para excluirlas de las disponibles
    // Obtener inscripciones activas
    const materiasInscritas = await Inscripcion.findAll({
      where: {
        id_alumno: alumno.id_alumno,
        inscrita: true,
      },
      include: [
        {
          model: Clase,
          attributes: ["clave_materia"]
        }
      ]
    });

    // Obtener claves de materias ya inscritas
    const clavesInscritas =
      materiasInscritas.map(
        i => i.clase.clave_materia
      );

    // Cargar clases disponibles excluyendo mismas materias
    const clases = await Clase.findAll({

      where: clavesInscritas.length > 0
        ? {
            clave_materia: {
              [Op.notIn]: clavesInscritas
            }
          }
        : {},

      include: [
        {
          model: Asignatura,
          attributes: [
            "nombre_asignatura",
            "creditos",
            "semestre",
            "optativa"
          ],
        },
        {
          model: Profesor,
          attributes: [
            "nombre",
            "ap_paterno"
          ],
        },
        {
          model: Grupo,
          as: "grupoClase",
          attributes: ["num_grupo"],
        },
      ],

      order: [
        [Asignatura, "optativa", "ASC"],
        [Asignatura, "semestre", "ASC"],
        [Asignatura, "nombre_asignatura", "ASC"],
      ],
    });

     // Agrupar clases por semestre y optativas
    const clasesAgrupadas = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      optativas: [],
    };

    clases.forEach(clase => {

      if (clase.asignatura.optativa) {

        clasesAgrupadas.optativas.push(clase);

      } else {

        const semestre =
          clase.asignatura.semestre;

        if (clasesAgrupadas[semestre]) {

          clasesAgrupadas[semestre].push(clase);
        }
      }
    });
   

    return res.render("inscripcion/inscripciones", {
      alumno,
      clasesAgrupadas,
      error: null,
      exito: null,
    });

  } catch (error) {
    console.error(error);
    return res.render("inscripcion/index", {
      error: "Error en el servidor",
      exito: null,
    });
  }
};

export default iniciarSesion;