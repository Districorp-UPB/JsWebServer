import jwt from 'jsonwebtoken';

const decodificarJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        // Si el error es de expiración del token, lo capturamos aquí
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expirado');
        }
        throw new Error('Token inválido');
    }
};

export { decodificarJWT };