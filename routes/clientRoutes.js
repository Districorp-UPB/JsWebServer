const express = require("express");
const clientController = require("../controllers/clientController");
const router = express.Router();
const soapController = require('../controllers/soapController');

//router.post('/datos', clientController.recibirDatos);
router.get('/info', clientController.obtenerDatos);
router.post('/authenticate', soapController.authenticateUser);

module.exports = router;



