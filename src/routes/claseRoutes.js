import { Router } from "express";
import {
  getClases,
  getClase,
  crearClase,
  actualizarClase,
  eliminarClase
} from "../controllers/claseController.js"

const router = Router();

router.get("/",          getClases);
router.get("/:id",       getClase);
router.post("/",         crearClase);
router.put("/:id",       actualizarClase);
router.delete("/:id",    eliminarClase);

export default router;