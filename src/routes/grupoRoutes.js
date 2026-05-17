import { Router } from "express";
import {
  getGrupos,
  getGrupo,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo
} from "../controllers/grupoController.js"

const router = Router();

router.get("/",          getGrupos);
router.get("/:id",       getGrupo);
router.post("/",         crearGrupo);
router.put("/:id",       actualizarGrupo);
router.delete("/:id",    eliminarGrupo);

export default router;