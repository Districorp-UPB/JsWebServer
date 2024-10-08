import soapService from '../services/soapService.js';  

const authenticateUser = async (req, res) => {
    const { email, password, ou } = req.body; 

    if (!email || !password || !ou) {
        return res.status(400).json({ error: 'Faltan parámetros requeridos: email, password, ou' });
    }

    try {
        const token = await soapService.authenticateUser(email, password, ou);
        res.json({ message: 'Usuario autenticado correctamente.', token: token }); 
    } catch (error) {
        console.error('Error autenticando usuario:', error);
        res.status(500).json({ error: 'Error de autenticación' });
    }
};

export default { authenticateUser };




