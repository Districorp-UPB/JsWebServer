import express from "express";
//import serverConfig from "./config/serverConfig.js";
import clientRoutes from "./routes/clientRoutes.js";
import fileserverRoutes from "./routes/fileserverRoutes.js";


const app = express();

const PORT = process.env.PORT || 3000;

// Carpeta publica
app.use(express.static('public'))

app.use(express.json());

app.use("/api", clientRoutes);
app.use("/api/fileserver", fileserverRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});