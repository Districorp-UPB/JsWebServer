import fs from 'fs';
import path from 'path';

// Función para convertir archivo a base64
const convertToBase64 = (filePath) => {
    const fileData = fs.readFileSync(filePath);  
    return Buffer.from(fileData).toString('base64');  
};

// Función para subir imágenes
const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ninguna imagen" });
    }
    
    // Guardar nombre original y convertir a base64
    const originalName = req.file.originalname;
    const base64Data = convertToBase64(req.file.path);

    // Imprimir en la consola
    console.log("Imagen subida exitosamente:", originalName);
    console.log("Contenido en Base64:", base64Data);

    res.send({ message: "Imagen subida exitosamente", file: req.file });
};

// Función para subir videos
const uploadVideo = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún video" });
    }

    // Guardar nombre original y convertir a base64
    const originalName = req.file.originalname;
    const base64Data = convertToBase64(req.file.path);

    // Imprimir en la consola
    console.log("Video subido exitosamente:", originalName);
    console.log("Contenido en Base64:", base64Data);

    res.send({ message: "Video subido exitosamente", file: req.file });
};

// Función para subir otros archivos
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún archivo" });
    }

    // Guardar nombre original y convertir a base64
    const originalName = req.file.originalname;
    const base64Data = convertToBase64(req.file.path);

    // Imprimir en la consola
    console.log("Archivo subido exitosamente:", originalName);
    console.log("Contenido en Base64:", base64Data);

    res.send({ message: "Archivo subido exitosamente", file: req.file });
};

export default {
    uploadImage,
    uploadVideo,
    uploadFile
};
