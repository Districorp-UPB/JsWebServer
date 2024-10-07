import express from "express";  
//import clientController from "../controllers/clientController.js";  
import soapController from '../controllers/soapController.js'; 

const router = express.Router();

//router.post('/datos', clientController.recibirDatos);
//router.get('/info', clientController.enviarDatos);
router.post('/authenticate', soapController.authenticateUser);

export default router; 


