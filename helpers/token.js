import jwt from 'jsonwebtoken';

const decodificarJWT = token => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw error;
    }
};

export { decodificarJWT };