import { Router } from "express";
import {
  getAreas,
  getArea,
  crearArea,
  actualizarArea,
  eliminarArea
} from "../controllers/areaController.js"

const router = Router();

router.get("/",          getAreas);
router.get("/:id",       getArea);
router.post("/",         crearArea);
router.put("/:id",       actualizarArea);
router.delete("/:id",    eliminarArea);

export default router;