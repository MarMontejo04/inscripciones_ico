import Alumno from "./Alumno.js";
import Clase from "./Clase.js";
import Inscripcion from "./Inscripcion.js";
import Profesor from "./Profesor.js";
import Grupo from "./Grupo.js";
import Asignatura from "./Asignatura.js";


// =====================
// INSCRIPCION
// =====================

Inscripcion.belongsTo(Alumno, {
  foreignKey: "id_alumno"
});

Alumno.hasMany(Inscripcion, {
  foreignKey: "id_alumno"
});

Inscripcion.belongsTo(Clase, {
  foreignKey: "id_clase"
});

Clase.hasMany(Inscripcion, {
  foreignKey: "id_clase"
});


// =====================
// CLASE
// =====================

Clase.belongsTo(Profesor, {
  foreignKey: "id_profesor"
});

Clase.belongsTo(Asignatura, {
  foreignKey: "clave_materia"
});

Clase.belongsTo(Grupo, {
  foreignKey: "grupo",
  as: "grupoClase"
});


export {
  Alumno,
  Clase,
  Inscripcion,
  Profesor,
  Grupo,
  Asignatura
};