const soapService = require('../services/soapService');

const authenticateUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await soapService.authenticateUser(username, password);
        res.json({ message: 'Usuario autenticado correctamente.', token: token }); 
    } catch (error) {
        console.error('Error autenticando usuario:', error);
        res.status(500).json({ error: 'Error de autenticación' });
    }
};

module.exports = { authenticateUser };

