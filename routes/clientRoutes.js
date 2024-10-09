import express from "express";  

import soapController from '../controllers/soapController.js'; 

const router = express.Router();

router.post('/authenticate', soapController.authenticateUser);

router.post('/register/:token', soapController.registerUser);

router.post('/edit/:token', soapController.editUser); 

router.post('/delete/:token', soapController.deleteUser);

router.post('/list/:ou/:token', soapController.listUsers); 

router.get('/usuario/:email', soapController.getUserByEmail);

export default router; 

