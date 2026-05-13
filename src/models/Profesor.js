import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const Profesor = db.define("profesor", {
  id_profesor: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
},{
  freezeTableName:true,
  timestamps: false,
});


export default Profesor;
