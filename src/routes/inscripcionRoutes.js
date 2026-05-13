import { Router } from "express";
import { mostrarFormulario, inscribir } from "../controllers/inscripcionController.js";

const router = Router();

router.get("/", mostrarFormulario);
router.post("/", inscribir);

export default router;