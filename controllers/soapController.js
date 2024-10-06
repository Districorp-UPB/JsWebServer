import soapService from '../services/soapService.js';  // Importar el servicio SOAP

// Función para autenticar al usuario
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

// Exportar la función authenticateUser
export default { authenticateUser };
