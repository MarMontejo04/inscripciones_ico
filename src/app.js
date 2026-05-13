import express from "express"
import db from "../config/db.js"
import inscripcionRoutes from "./routes/inscripcionRoutes.js";


//Crear aplicación
const app = express()

//Acceso a datos formulario
app.use(express.urlencoded({extended:true}))

//Pug
app.set("view engine", "pug");
app.set("views", "./src/views");

//Routes
app.use("/inscripciones", inscripcionRoutes);


//Conexion con BD
try{
    await db.authenticate()
    db.sync()
    console.log("Conexión exitosa con la BD")
}catch(error){
    console.log(error)
}

const port = 4800;
app.listen(port,() => {
    console.log(`Esperando peticiones del puerto ${port}`)
})