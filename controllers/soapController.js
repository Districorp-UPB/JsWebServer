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

const registerUser = async (req, res) => {
    const { name, surname, email, phone, document, password, role } = req.body; 

    if (!name || !surname || !email || !phone || !document || !password || !role) { 
        return res.status(400).json({ error: 'Faltan parámetros requeridos: name, surname, email, phone, document, password, role' });
    }

    if (typeof document !== 'string' || document.trim().length === 0) {
        return res.status(400).json({ error: 'El documento no es válido.' });
    }

    try {
        const { status, message } = await soapService.registerUser(name, surname, email, phone, document, password, role); 
        if (status !== 'success') {
            return res.status(400).json({ message: 'Error en el registro: ' + message });
        }

        res.json({ message: 'Usuario registrado correctamente.', status, message });
    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).json({ error: 'Error de registro' });
    }    
};

export default { authenticateUser, registerUser };
