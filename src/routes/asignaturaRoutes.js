import { Router } from "express";
import {
  getAsignaturas,
  getAsignatura,
  crearAsignatura,
  actualizarAsignatura,
  eliminarAsignatura
} from "../controllers/asignaturaController.js"

const router = Router();

router.get("/",          getAsignaturas);
router.get("/:id",       getAsignatura);
router.post("/",         crearAsignatura);
router.put("/:id",       actualizarAsignatura);
router.delete("/:id",    eliminarAsignatura);

export default router;