import express from "express";
import clientRoutes from "./routes/clientRoutes.js";
import fileserverRoutes from "./routes/fileserverRoutes.js";
import db from "./config/db.js";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'))

app.use(express.json());

//Conexion a la base de datos
try{
    await db.authenticate();
    db.sync()
    console.log(`Conexión Correcta a ${process.env.DATABASE} de MySQL`)
} catch(error){
    console.log(error)
}


app.use("/api", clientRoutes);
app.use("/api/fileserver", fileserverRoutes);

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});





