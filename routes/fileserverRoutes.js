import express from "express";
import upload from "../middleware/multer.js";
import grpcController from "../controllers/grpcController.js"; 

const router = express.Router();

router.post("/upload/imagen/:token", upload.single('image'), grpcController.uploadImage);

/**
 * @swagger
 * /grpc/upload/imagen/{token}:
 *   post:
 *     summary: Sube una imagen utilizando gRPC
 *     description: Sube una imagen al servidor utilizando gRPC. El token JWT se usa para identificar al usuario. La imagen se almacena en el servidor y se transfiere a través de gRPC.
 *     tags:
 *       - gRPC
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al usuario
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen a subir
 *     responses:
 *       200:
 *         description: Imagen subida exitosamente a través de gRPC
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Imagen subida exitosamente
 *                 fileUrl:
 *                   type: string
 *                   example: https://example.com/imagenes/imagen123.jpg
 *                 usuario:
 *                   type: integer
 *                   example: 1
 *                 imagenId:
 *                   type: integer
 *                   example: 123
 *                 grpcFileId:
 *                   type: string
 *                   example: 456
 *       400:
 *         description: Token o imagen no proporcionados
 *       401:
 *         description: Token inválido o expirado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/grpc/upload/imagen/:token", upload.single('image'), grpcController.uploadImageGrpc);


router.post("/upload/video/:token", upload.single('video'), grpcController.uploadVideo);

/**
 * @swagger
 * /grpc/upload/video/{token}:
 *   post:
 *     summary: Sube un video utilizando gRPC
 *     description: Sube un video al servidor utilizando gRPC. El token JWT se usa para identificar al usuario. El video se almacena en el servidor y se transfiere a través de gRPC.
 *     tags:
 *       - gRPC
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al usuario
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de video a subir
 *     responses:
 *       200:
 *         description: Video subido exitosamente a través de gRPC
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Video subido exitosamente
 *                 fileUrl:
 *                   type: string
 *                   example: https://example.com/videos/video123.mp4
 *                 usuario:
 *                   type: integer
 *                   example: 1
 *                 videoId:
 *                   type: integer
 *                   example: 123
 *                 grpcFileId:
 *                   type: string
 *                   example: 456
 *       400:
 *         description: Token o video no proporcionados
 *       401:
 *         description: Token inválido o expirado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/grpc/upload/video/:token", upload.single('video'), grpcController.uploadVideoGrpc);


router.post("/upload/archivo/:token", upload.single('file'), grpcController.uploadFile);

/**
 * @swagger
 * /grpc/upload/archivo/{token}:
 *   post:
 *     summary: Sube un archivo utilizando gRPC
 *     description: Sube un archivo al servidor utilizando gRPC. El token JWT se usa para identificar al usuario. El archivo se almacena en el servidor y se transfiere a través de gRPC.
 *     tags:
 *       - gRPC
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al usuario
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo a subir
 *     responses:
 *       200:
 *         description: Archivo subido exitosamente a través de gRPC
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Archivo subido exitosamente
 *                 fileUrl:
 *                   type: string
 *                   example: https://example.com/archivos/archivo123.pdf
 *                 usuario:
 *                   type: integer
 *                   example: 1
 *                 archivoId:
 *                   type: integer
 *                   example: 123
 *                 grpcFileId:
 *                   type: string
 *                   example: 456
 *       400:
 *         description: Token o archivo no proporcionados
 *       401:
 *         description: Token inválido o expirado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/grpc/upload/archivo/:token", upload.single('file'), grpcController.uploadFileGrpc);


router.get("/imagenes/:token", grpcController.buscarImagenes);

/**
 * @swagger
 * /grpc/imagenes/{token}:
 *   get:
 *     summary: Recupera imágenes utilizando gRPC
 *     description: Obtiene la lista de imágenes de un usuario autenticado utilizando gRPC.
 *     tags:
 *       - gRPC
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al usuario
 *     responses:
 *       200:
 *         description: Lista de imágenes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   usuario_id:
 *                     type: integer
 *                     example: 1
 *                   nombre_archivo:
 *                     type: string
 *                     example: imagen123.jpg
 *                   binary_file:
 *                     type: string
 *                     example: "base64 encoded image"
 *       400:
 *         description: Token no proporcionado
 *       401:
 *         description: Token inválido o expirado
 *       404:
 *         description: Usuario no encontrado o sin imágenes
 *       500:
 *         description: Error interno del servidor
 */
router.get("/grpc/imagenes/:token", grpcController.buscarImagenesGrpc);

router.get("/videos/:token", grpcController.buscarVideos);

/**
 * @swagger
 * /grpc/videos/{token}:
 *   get:
 *     summary: Recupera videos utilizando gRPC
 *     description: Obtiene la lista de videos de un usuario autenticado utilizando gRPC.
 *     tags:
 *       - gRPC
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al usuario
 *     responses:
 *       200:
 *         description: Lista de videos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   usuario_id:
 *                     type: integer
 *                     example: 1
 *                   nombre_archivo:
 *                     type: string
 *                     example: video123.mp4
 *                   binary_file:
 *                     type: string
 *                     example: "base64 encoded video"
 *       400:
 *         description: Token no proporcionado
 *       401:
 *         description: Token inválido o expirado
 *       404:
 *         description: Usuario no encontrado o sin videos
 *       500:
 *         description: Error interno del servidor
 */
router.get("/grpc/videos/:token", grpcController.buscarVideosGrpc);


router.get("/archivos/:token", grpcController.buscarArchivos);

/**
 * @swagger
 * /grpc/archivos/{token}:
 *   get:
 *     summary: Recupera archivos utilizando gRPC
 *     description: Obtiene la lista de archivos de un usuario autenticado utilizando gRPC.
 *     tags:
 *       - gRPC
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al usuario
 *     responses:
 *       200:
 *         description: Lista de archivos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   usuario_id:
 *                     type: integer
 *                     example: 1
 *                   nombre_archivo:
 *                     type: string
 *                     example: archivo123.pdf
 *                   binary_file:
 *                     type: string
 *                     example: "base64 encoded file"
 *       400:
 *         description: Token no proporcionado
 *       401:
 *         description: Token inválido o expirado
 *       404:
 *         description: Usuario no encontrado o sin archivos
 *       500:
 *         description: Error interno del servidor
 */
router.get("/grpc/archivos/:token", grpcController.buscarArchivosGrpc);

export default router;
