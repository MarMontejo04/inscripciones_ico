import { DataTypes } from "sequelize";
import db from "../../config/db.js";

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
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  pregunta_secreta: {
    type: DataTypes.STRING(255),
  },
  respuesta_secreta: {
    type: DataTypes.STRING(255),
  }
},{
  freezeTableName:true,
  timestamps: false,
});


export default Alumno;
