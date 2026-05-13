import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Asignatura from "./Asignatura.js";


const Area = db.define("area", {
  id_area: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  nombre_area: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
},{
  freezeTableName:true,
  timestamps: false,
});


export default Area;