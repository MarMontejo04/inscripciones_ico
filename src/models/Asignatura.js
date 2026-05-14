import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Area from "./Area.js";
import Clase from "./Clase.js";

const Asignatura = db.define("asignatura", {
  clave: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  nombre_asignatura: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  creditos: {
    type: DataTypes.INTEGER,
  },
  semestre: {
    type: DataTypes.INTEGER,
  },
  optativa: {
    type: DataTypes.BOOLEAN,
  },
  laboratorio: {
    type: DataTypes.BOOLEAN,
  },
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "area",
      key: "id_area",
    },
  },
},{
  freezeTableName:true,
  timestamps: false,
});


export default Asignatura;
