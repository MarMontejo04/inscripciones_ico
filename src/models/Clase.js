import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Asignatura from "./Asignatura.js";
import Grupo from "./Grupo.js";
import Profesor from "./Profesor.js";
import Inscripcion from "./Inscripcion.js";

const Clase = db.define("clase", {
  id_clase: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  salon: {
    type: DataTypes.STRING(20),
  },
  dia_semana: {
    type: DataTypes.STRING(50),
  },
  hora_inicio: {
    type: DataTypes.TIME,
  },
  hora_final: {
    type: DataTypes.TIME,
  },
  clave_materia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "asignatura",
      key: "clave",
    },
  },
  grupo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "grupo",
      key: "num_grupo",
    },
  },
  id_profesor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "profesor",
      key: "id_profesor",
    },
  },
},{
  freezeTableName:true,
  timestamps: false,
});

Clase.belongsTo(Asignatura, { foreignKey: "clave_materia" });
Clase.belongsTo(Grupo, { foreignKey: "grupo",as: "grupoClase" });
Clase.belongsTo(Profesor, { foreignKey: "id_profesor" });

export default Clase;
