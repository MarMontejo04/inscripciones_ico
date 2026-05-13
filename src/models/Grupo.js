import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Clase from "./Clase.js";

const Grupo = db.define("grupo", {
  num_grupo: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  freezeTableName:true,
  timestamps: false,
});


export default Grupo;
