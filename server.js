const express = require("express");
const serverConfig = require("./config/serverConfig");
const clientRoutes = require("./routes/clientRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", clientRoutes);

app.listen(serverConfig.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${serverConfig.PORT}`);
});




