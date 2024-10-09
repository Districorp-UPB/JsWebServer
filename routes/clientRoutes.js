import express from "express";  

import soapController from '../controllers/soapController.js'; 

const router = express.Router();

router.post('/authenticate', soapController.authenticateUser);

router.post('/register', soapController.registerUser);

router.post('/edit', soapController.editUser); 

router.post('/delete', soapController.deleteUser);

router.post('/list', soapController.listUsers); 

router.get('/usuario/:email', soapController.getUserByEmail);

export default router; 

