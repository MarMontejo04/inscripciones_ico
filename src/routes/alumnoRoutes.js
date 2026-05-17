import { Router } from "express";
import {
  getAlumnos,
  getAlumno,
  crearAlumno,
  actualizarAlumno,
  eliminarAlumno
} from "../controllers/alumnoController.js"

const router = Router();

router.get("/",          getAlumnos);
router.get("/:id",       getAlumno);
router.post("/",         crearAlumno);
router.put("/:id",       actualizarAlumno);
router.delete("/:id",    eliminarAlumno);

export default router;