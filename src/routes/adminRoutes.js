import { Router } from "express";
import alumnoRoutes    from "./alumnoRoutes.js";
import profesorRoutes  from "./profesorRoutes.js";
import asignaturaRoutes from "./asignaturaRoutes.js";
import claseRoutes     from "./claseRoutes.js";
import grupoRoutes     from "./grupoRoutes.js";
import areaRoutes      from "./areaRoutes.js";
import inscripcionAdminRoutes from "./inscripcionRoutes.js";

const router = Router();

router.get("/", (req, res) => res.render("admin"));

router.use("/alumnos",       alumnoRoutes);
router.use("/profesores",    profesorRoutes);
router.use("/asignaturas",   asignaturaRoutes);
router.use("/clases",        claseRoutes);
router.use("/grupos",        grupoRoutes);
router.use("/areas",         areaRoutes);
router.use("/inscripciones", inscripcionAdminRoutes);

export default router;