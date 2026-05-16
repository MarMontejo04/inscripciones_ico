import express from "express";
import db from "../config/db.js";
import "./models/index.js";
import inscripcionRoutes from "./routes/inscripcionRoutes.js";

import path from "path";
import { fileURLToPath } from "url";


// Crear __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear aplicación
const app = express();

// Acceso a datos formulario
app.use(express.urlencoded({ extended: true }));

// Pug
app.set("view engine", "pug");
app.set("views", "./src/views");

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/bootstrap",
  express.static(
    path.resolve("node_modules/bootstrap/dist")
  )
);

app.get("/prueba-bootstrap", (req, res) => {
  res.sendFile(
    path.resolve("node_modules/bootstrap/dist/css/bootstrap.min.css")
  );
});

console.log(
  path.resolve("node_modules/bootstrap/dist")
);

// Routes
app.use("/inicio", inscripcionRoutes);

// Conexion con BD
try {
  await db.authenticate();
  await db.sync();
  console.log("Conexión exitosa con la BD");
} catch (error) {
  console.log(error);
}



const port = 4800;

app.listen(port, () => {
  console.log(`Esperando peticiones del puerto ${port}`);
});