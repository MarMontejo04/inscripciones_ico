import express from "express";

import iniciarSesion from "../controllers/iniciarSesion.js";

import {
  mostrarFormulario,
  inscribir
} from "../controllers/inscripcionController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("inscripcion/index");
});

// Login
router.post("/auth/login", iniciarSesion);

// Guardar inscripción
router.post("/", inscribir);


router.post("/logout", (req, res) => {

  return res.render("inscripcion/index", {
    error: null,
    exito: "Sesión cerrada correctamente"
  });

});

export default router;