import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Clase from "./Clase.js";
import Alumno from "./Alumno.js";

const Inscripcion = db.define("inscripcion", {
  id_inscripcion: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  fecha_inscripcion: {
    type: DataTypes.DATEONLY,
  },
  hora_inscripcion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  semestre_curso: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  id_clase: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "clase",
      key: "id_clase",
    },
  },
  id_alumno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "alumno",
      key: "id_alumno",
    },
  },
},{
  freezeTableName:true,
  timestamps: false,
});

Inscripcion.belongsTo(Clase, { foreignKey: "id_clase" });
Inscripcion.belongsTo(Alumno, { foreignKey: "id_alumno" });

export default Inscripcion;
