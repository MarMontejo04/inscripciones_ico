import { Router } from "express";

import {
  getProfesores,
  getProfesor,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor
} from "../controllers/profesorController.js"

const router = Router();

router.get("/",          getProfesores);
router.get("/:id",       getProfesor);
router.post("/",         crearProfesor);
router.put("/:id",       actualizarProfesor);
router.delete("/:id",    eliminarProfesor);

export default router;


