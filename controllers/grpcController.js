import path from 'path';

// Función para subir imágenes
const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ninguna imagen" });
    }
    // Aquí puedes agregar lógica gRPC si es necesario
    // Ejemplo: llamar a un servicio gRPC que registre el archivo en una base de datos o lo procese.
    res.send({ message: "Imagen subida exitosamente", file: req.file });
};

// Función para subir videos
const uploadVideo = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún video" });
    }
    // Lógica gRPC adicional aquí si lo necesitas
    res.send({ message: "Video subido exitosamente", file: req.file });
};

// Función para subir otros archivos
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No se subió ningún archivo" });
    }
    // Lógica gRPC adicional aquí si es necesario
    res.send({ message: "Archivo subido exitosamente", file: req.file });
};

export default {
    uploadImage,
    uploadVideo,
    uploadFile
};
