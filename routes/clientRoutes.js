import express from "express";  

import soapController from '../controllers/soapController.js'; 

const router = express.Router();

router.post('/authenticate', soapController.authenticateUser);

router.post('/register', soapController.registerUser);

export default router; 

