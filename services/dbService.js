import {Usuario, Imagen,Video,Archivo} from '../models/index.js'; 

// Función para buscar usuario por email
const buscarUsuarioPorEmail = async (email) => {
    try {
        const usuario = await Usuario.findOne({
            where: { email },  // Condición de búsqueda
            attributes: { exclude: ['password'] }  // Excluir la contraseña del resultado
        });

        // Verificar si el usuario fue encontrado
        if (!usuario) {
            return { message: 'Usuario no encontrado' };
        }

        return usuario;
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return { error: 'Ocurrió un error al buscar el usuario' };
    }
};

const crearImagen = async (nombreArchivo, url, usuarioId, ubicacionArchivo) => {
    try {
        const imagen = await Imagen.create({
            nombre_archivo: nombreArchivo,
            url: url,
            usuario_id: usuarioId,
            ubicacion_archivo: ubicacionArchivo
        });
        console.log('Imagen guardada en la base de datos.');
        return imagen;
    } catch (error) {
        console.error('Error al guardar la imagen en la base de datos:', error);
        throw new Error('Error al guardar la imagen en la base de datos');
    }
};

export {
    buscarUsuarioPorEmail,
    crearImagen

}
