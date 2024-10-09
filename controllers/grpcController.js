import fs from 'fs'; 
import path from 'path';
//import {Archivo, Imagen, Video} from '../models/index.js';
import client from '../services/grpcService.js';
import { decodificarJWT } from '../helpers/token.js';
import { buscarUsuarioPorEmail,crearImagen,crearVideo,crearArchivo,buscarArchivosdb,buscarVideosdb,buscarImagenesdb } from '../services/dbService.js';
import Imagen from '../models/Imagen.js';

const BASE_URL = 'http://sistema3.bucaramanga.upb.edu.co:4000/uploads';

// Función para subir imágenes
const uploadImage = async (req, res) => {
    console.log('Iniciando uploadImage');

    const { token } = req.params;
    console.log('Token:', token);

    if (!token) {
        console.error("Token no proporcionado en la URL");
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        if (error.message === 'Token expirado') {
            console.error('Token expirado');
            return res.status(401).json({ error: 'Token expirado' });
        }
        console.error('Token inválido');
        return res.status(401).json({ error: 'Token inválido' });
    }

    const { email } = decodedToken;
    console.log('Email del usuario:', email);

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('Datos del usuario encontrado:', usuario);
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    if (!req.file) {
        console.log('No se subió ninguna imagen');
        return res.status(400).json({ error: "No se subió ninguna imagen" });
    }

    const { originalname, filename, path: filePath } = req.file;
    const fileUrl = `${BASE_URL}/imagenes/${filename}`;

    fs.readFile(filePath, async (err, fileContent) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ error: 'Error al leer el archivo: ' + err.message });
        }

        try {
            // Llamar al servicio para crear la imagen en la base de datos
            let imagen = await crearImagen(originalname, fileUrl, usuario.id, filePath);

            return res.status(200).json({
                message: "Imagen subida exitosamente",
                fileUrl: fileUrl,
                usuario: usuario.id,
                imgaenid: imagen.id
            });
        } catch (dbError) {
            return res.status(500).json({ error: dbError.message });
        }
    });
};

// Función para subir videos
const uploadVideo = async (req, res) => {
    const { token } = req.params;
    console.log('Token:', token);

    if (!token) {
        console.error("Token no proporcionado en la URL");
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        if (error.message === 'Token expirado') {
            console.error('Token expirado');
            return res.status(401).json({ error: 'Token expirado' });
        }
        console.error('Token inválido');
        return res.status(401).json({ error: 'Token inválido' });
    }

    const { email } = decodedToken;
    console.log('Email del usuario:', email);

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('Datos del usuario encontrado:', usuario);
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún video" });
    }

    const { originalname, filename, path: filePath } = req.file;
    const fileUrl = `${BASE_URL}/videos/${filename}`;

    fs.readFile(filePath, async (err) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send({ error: 'Error al leer el archivo: ' + err.message });
        }

        try {
            await crearVideo(originalname, fileUrl, usuario.id, filePath);
            console.log('Video guardado en la base de datos.');

            return res.send({
                message: "Video subido exitosamente",
                fileUrl: fileUrl,
            });
        } catch (dbError) {
            console.error('Error al guardar el video en la base de datos:', dbError);
            return res.status(500).send({ error: 'Error al guardar el video en la base de datos: ' + dbError.message });
        }
    });
};

// Función para subir otros archivos
const uploadFile = async (req, res) => {
    const { token } = req.params;
    console.log('Token:', token);

    if (!token) {
        console.error("Token no proporcionado en la URL");
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        if (error.message === 'Token expirado') {
            console.error('Token expirado');
            return res.status(401).json({ error: 'Token expirado' });
        }
        console.error('Token inválido');
        return res.status(401).json({ error: 'Token inválido' });
    }

    const { email } = decodedToken;
    console.log('Email del usuario:', email);

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('Datos del usuario encontrado:', usuario);
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún archivo" });
    }

    const { originalname, filename, path: filePath } = req.file;
    const fileUrl = `${BASE_URL}/archivos/${filename}`; 

    fs.readFile(filePath, async (err) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send({ error: 'Error al leer el archivo: ' + err.message });
        }

        try {
            await crearArchivo(originalname, fileUrl, usuario.id, filePath);
            console.log('Archivo guardado en la base de datos.');

            return res.send({
                message: "Archivo subido exitosamente",
                fileUrl: fileUrl,
            });
        } catch (dbError) {
            console.error('Error al guardar el archivo en la base de datos:', dbError);
            return res.status(500).send({ error: 'Error al guardar el archivo en la base de datos: ' + dbError.message });
        }
    });
};

// Función para buscar imágenes
const buscarImagenes = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { email } = decodedToken;

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    const resultado = await buscarImagenesdb(usuario.id);

    if (resultado.error) {
        return res.status(500).json({ error: resultado.error });
    }

    return res.status(200).json(resultado);
};

// Función para buscar videos
const buscarVideos = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { email } = decodedToken;

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    const resultado = await buscarVideosdb(usuario.id);
    
    if (resultado.error) {
        return res.status(500).json({ error: resultado.error });
    }

    return res.status(200).json(resultado);
};


// Función para buscar archivos
const buscarArchivos = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { email } = decodedToken;

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    // Llamar a la función buscarArchivos pasando el ID del usuario
    const resultado = await buscarArchivosdb(usuario.id);
    
    // Verificar el resultado de la búsqueda
    if (resultado.error) {
        return res.status(500).json({ error: resultado.error });
    }

    return res.status(200).json(resultado);
};

const uploadImageGrpc = async (req, res) => {
    console.log('Iniciando uploadImage');

    const { token } = req.params;
    console.log('Token:', token);

    if (!token) {
        console.error("Token no proporcionado en la URL");
        return res.status(400).json({ error: "Token no proporcionado en la URL" });
    }

    let decodedToken;
    try {
        decodedToken = decodificarJWT(token);
    } catch (error) {
        if (error.message === 'Token expirado') {
            console.error('Token expirado');
            return res.status(401).json({ error: 'Token expirado' });
        }
        console.error('Token inválido');
        return res.status(401).json({ error: 'Token inválido' });
    }

    const { email } = decodedToken;
    console.log('Email del usuario:', email);

    let usuario;
    try {
        usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('Datos del usuario encontrado:', usuario);
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    }

    if (!req.file) {
        console.log('No se subió ninguna imagen');
        return res.status(400).json({ error: "No se subió ninguna imagen" });
    }

    const { originalname, filename, path: filePath } = req.file;
    const fileUrl = `${BASE_URL}/imagenes/${filename}`;

    fs.readFile(filePath, async (err, fileContent) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).json({ error: 'Error al leer el archivo: ' + err.message });
        }

        try {
            // Llamar al servicio para crear la imagen en la base de datos
            let imagen = await crearImagen(originalname, fileUrl, usuario.id, filePath);

            // Enviar la imagen al servicio gRPC después de subirla a la base de datos
            const grpcRequest = {
                file_id: imagen.id,  // ID de la imagen que acabamos de guardar en la base de datos
                owner_id: usuario.id,  // ID del usuario
                binary_file: fileContent,  // El contenido del archivo en binario
                file_name: originalname  // Nombre original del archivo
            };

            const call = client.Upload();

            // Enviar datos al servidor gRPC
            call.write(grpcRequest);

            // Esperar respuesta del servidor gRPC
            call.end();

            call.on('data', (grpcResponse) => {
                console.log('Respuesta del servidor gRPC:', grpcResponse);

                return res.status(200).json({
                    message: "Imagen subida exitosamente",
                    fileUrl: fileUrl,
                    usuario: usuario.id,
                    imagenId: imagen.id,
                    grpcFileId: grpcResponse.file_id
                });
            });

            call.on('error', (grpcError) => {
                console.error('Error en la llamada gRPC:', grpcError);
                return res.status(500).json({ error: 'Error en el servicio gRPC: ' + grpcError.message });
            });

        } catch (dbError) {
            console.error('Error al guardar la imagen en la base de datos:', dbError);
            return res.status(500).json({ error: dbError.message });
        }
    });
};

export default {
    uploadImage,
    uploadVideo,
    uploadFile,
    buscarImagenes,
    buscarVideos,
    buscarArchivos,
    uploadImageGrpc
};
