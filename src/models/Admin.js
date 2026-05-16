import { DataTypes } from "sequelize";
import db from "../../config/db.js";

const Admin = db.define("admin", {

  id_admin: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  nombre: {
    type: DataTypes.STRING,
  },

}, {
  tableName: "admin",
  timestamps: false,
});

export default Admin;