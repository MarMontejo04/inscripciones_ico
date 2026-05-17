import express from "express";
import db from "../config/db.js";
import "./models/index.js";
import inscripcionRoutes from "./routes/inscripcionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // ← CRÍTICO: sin esto los POST/PUT no leen el body

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.static(path.join(__dirname, "public")));
app.use("/bootstrap", express.static(path.resolve("node_modules/bootstrap/dist")));

// Rutas
app.use("/inicio", inscripcionRoutes);
app.use("/admin", adminRoutes);

try {
  await db.authenticate();
  await db.sync();
  console.log("Conexión exitosa con la BD");
} catch (error) {
  console.log(error);
}

const port = 4800;
app.listen(port, () => console.log(`Puerto ${port}`));