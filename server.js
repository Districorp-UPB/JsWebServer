import express from "express";
//import serverConfig from "./config/serverConfig.js";
//import clientRoutes from "./routes/clientRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

//app.use("/api", clientRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});