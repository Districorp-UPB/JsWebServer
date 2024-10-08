import fs from 'fs'; 
import path from 'path';
import {Archivo, Imagen, Video} from '../models/index.js';
import { decodificarJWT } from '../helpers/token.js';
import { buscarUsuarioPorEmail,crearImagen } from '../services/dbService.js';

const BASE_URL = 'http://localhost:3000/uploads';

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
            await crearImagen(originalname, fileUrl, usuario.id, filePath);

            return res.status(200).json({
                message: "Imagen subida exitosamente",
                fileUrl: fileUrl
            });
        } catch (dbError) {
            return res.status(500).json({ error: dbError.message });
        }
    });
};

// Función para subir videos
const uploadVideo = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún video" });
    }

    const { originalname, filename, path: filePath } = req.file;
    const ownerId = "owner_id_example";
    //const fileId = "video_" + Date.now();
    const fileUrl = `${BASE_URL}/videos/${filename}`;

    fs.readFile(filePath, async (err, fileContent) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send({ error: 'Error al leer el archivo: ' + err.message });
        }

        // Guardar el archivo en la base de datos
        try {
            await Video.create({
                nombre_archivo: originalname,
                url: fileUrl, // Guardar la URL generada
                usuario_id: ownerId,
                ubicacion_archivo: filePath // Ruta donde se guarda el archivo
            });

            console.log('Video guardado en la base de datos.');

            return res.send({
                message: "Video subido exitosamente",
                fileUrl: fileUrl,  // Enviar la URL en la respuesta
            });
        } catch (dbError) {
            console.error('Error al guardar el video en la base de datos:', dbError);
            return res.status(500).send({ error: 'Error al guardar el video en la base de datos: ' + dbError.message });
        }
    });
};

// Función para subir otros archivos
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún archivo" });
    }

    const { originalname, filename, path: filePath } = req.file;
    const ownerId = "owner_id_example";
    //const fileId = "file_" + Date.now();
    const fileUrl = `${BASE_URL}/archivos/${filename}`; // Generar la URL para otros archivos

    fs.readFile(filePath, async (err, fileContent) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send({ error: 'Error al leer el archivo: ' + err.message });
        }

        // Guardar el archivo en la base de datos
        try {
            await Archivo.create({
                nombre_archivo: originalname,
                url: fileUrl, // Guardar la URL generada
                usuario_id: ownerId,
                ubicacion_archivo: filePath // Ruta donde se guarda el archivo
            });

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


export default {
    uploadImage,
    uploadVideo,
    uploadFile
};
