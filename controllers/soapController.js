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
    const { name, surname, email, phone, document, password, ou } = req.body; 

    if (!name || !surname || !email || !phone || !document || !password || !ou) { 
        return res.status(400).json({ error: 'Faltan parámetros requeridos: name, surname, email, phone, document, password, ou' });
    }

    if (typeof document !== 'string' || document.trim().length === 0) {
        return res.status(400).json({ error: 'El documento no es válido.' });
    }

    try {
        const { status, message } = await soapService.registerUser(name, surname, email, phone, document, password, ou); 
        if (status !== 'success') {
            return res.status(400).json({ message: 'Error en el registro: ' + message });
        }

        res.json({ message: 'Usuario registrado correctamente.', status, message });
    } catch (error) {
        console.error('Error registrando usuario:', error);
        res.status(500).json({ error: 'Error de registro' });
    }    
};

const editUser = async (req, res) => {
    const { email, ou, name, surname, phone, document } = req.body; 

    if (!email || !ou || !name || !surname || !phone || !document) {
        return res.status(400).json({ error: 'Faltan parámetros requeridos: email, ou, name, surname, phone, document' });
    }

    try {
        const { status, message } = await soapService.editUser(email, ou, name, surname, phone, document); 
        if (status !== 'success') {
            return res.status(400).json({ message: 'Error en la edición: ' + message });
        }

        res.json({ message: 'Usuario editado correctamente.', status, message });
    } catch (error) {
        console.error('Error editando usuario:', error);
        res.status(500).json({ error: 'Error de edición' });
    }    
};

const deleteUser = async (req, res) => {
    const { email, ou } = req.body;

    if (!email || !ou) {
        return res.status(400).json({ error: 'Faltan parámetros requeridos: email y ou' });
    }

    try {
        const { status, message } = await soapService.deleteUser(email, ou);
        if (status !== 'success') {
            return res.status(400).json({ message: 'Error en la eliminación: ' + message });
        }

        res.json({ message: 'Usuario eliminado correctamente.', status, message });
    } catch (error) {
        console.error('Error eliminando usuario:', error);
        res.status(500).json({ error: 'Error de eliminación: ' + error.message });
    }
};


export default { authenticateUser, registerUser, editUser, deleteUser };


