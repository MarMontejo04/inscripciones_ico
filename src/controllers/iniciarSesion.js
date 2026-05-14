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


    const alumno = await Alumno.findOne({
      where: {
        num_cuenta
      }
    });

    // No existe
    if (!alumno) {

      return res.render("inscripcion/index", {
        error: "Número de cuenta no encontrado"
      });

    }

    // Password incorrecto
    if (alumno.password !== password) {

      return res.render("inscripcion/index", {
        error: "Contraseña incorrecta"
      });

    }
    const materiasAprobadas = await Inscripcion.findAll({

    where: {
        id_alumno: alumno.id_alumno,
        aprobada: true
    },

    include: [
        {
        model: Clase,
        attributes: ["clave_materia"]
        }
    ]

    });

    const clavesAprobadas = materiasAprobadas.map(inscripcion => {
    return inscripcion.clase.clave_materia;
    });

    const clases = await Clase.findAll({

    where: clavesAprobadas.length > 0
        ? {
            clave_materia: {
            [Op.notIn]: clavesAprobadas
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
        ]
        },

        {
        model: Profesor,
        attributes: ["nombre", "ap_paterno"]
        },

        {
        model: Grupo,
        as: "grupoClase",
        attributes: ["num_grupo"]
        }

    ],

    order: [

        [Asignatura, "optativa", "ASC"],

        [Asignatura, "semestre", "ASC"],

        [Asignatura, "nombre_asignatura", "ASC"]

    ]

    });

    // =========================
    // AGRUPAR POR SEMESTRE
    // =========================

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

      optativas: []

    };

    clases.forEach(clase => {

      // Optativas
      if (clase.asignatura.optativa) {

        clasesAgrupadas.optativas.push(clase);

      } else {

        const semestre = clase.asignatura.semestre;

        if (clasesAgrupadas[semestre]) {

          clasesAgrupadas[semestre].push(clase);

        }

      }

    });



    return res.render("inscripcion/inscripciones", {

      alumno,
      clasesAgrupadas

    });

  } catch (error) {

    console.log(error);

    return res.render("inscripcion/index", {
      error: "Error en el servidor"
    });

  }

};

export default iniciarSesion;