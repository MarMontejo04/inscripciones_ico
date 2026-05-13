import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Inscripcion from "./Inscripcion.js";

const Alumno = db.define("alumno", {
  id_alumno: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  num_cuenta: {
    type: DataTypes.INTEGER(9),
    allowNull: false,
  },
  ap_paterno: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ap_materno: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
  },
  semestre: {
    type: DataTypes.INTEGER,
  },
},{
  freezeTableName:true,
  timestamps: false,
});


export default Alumno;
