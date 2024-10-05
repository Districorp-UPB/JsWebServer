import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén el directorio actual del módulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Definir la carpeta de destino dependiendo del tipo de archivo
        let folder = 'archivos'; // Carpeta por defecto para otros archivos

        // Clasificar por tipo de archivo
        if (file.mimetype.startsWith('image')) {
            folder = 'imagenes';
        } else if (file.mimetype.startsWith('video')) {
            folder = 'videos';
        }

        // Establecer la ruta de destino
        cb(null, path.join(__dirname, `../public/uploads/${folder}`)); 
    },
    filename: function (req, file, cb) {
        // Generar un nombre de archivo único para evitar colisiones
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Crear la instancia de multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

export default upload;
