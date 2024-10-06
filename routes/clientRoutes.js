import express from "express";  // Importar express
import clientController from "../controllers/clientController.js";  // Importar el controlador
import soapController from '../controllers/soapController.js'; // Importar el controlador SOAP

const router = express.Router();

//router.post('/datos', clientController.recibirDatos);
router.get('/info', clientController.enviarDatos);
router.post('/authenticate', soapController.authenticateUser);

export default router; 
