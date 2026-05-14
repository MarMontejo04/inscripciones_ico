import express from "express";

import iniciarSesion from "../controllers/iniciarSesion.js";

const router = express.Router();

router.get("/", (req, res) => {

  res.render("inscripcion/index");

});


router.post("/auth/login", iniciarSesion);


export default router;