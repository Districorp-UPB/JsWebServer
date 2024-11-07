import express from "express";  

import soapController from '../controllers/soapController.js'; 

const router = express.Router();

/**
 * @swagger
 * /authenticate:
 *   post:
 *     summary: Autentica un usuario
 *     description: Autentica un usuario usando sus credenciales (email, password, ou) y devuelve un token JWT.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - ou
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "mypassword123"
 *               ou:
 *                 type: string
 *                 example: "Admin"
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario autenticado correctamente."
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1..."
 *       400:
 *         description: Faltan parámetros requeridos
 *       500:
 *         description: Error de autenticación
 */
router.post('/authenticate', soapController.authenticateUser);

/**
 * @swagger
 * /register/{token}:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema solo si el usuario autenticado tiene rol de administrador.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al usuario administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - surname
 *               - email
 *               - phone
 *               - document
 *               - password
 *               - ou
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan"
 *               surname:
 *                 type: string
 *                 example: "Pérez"
 *               email:
 *                 type: string
 *                 example: "juan.perez@example.com"
 *               phone:
 *                 type: string
 *                 example: "+123456789"
 *               document:
 *                 type: string
 *                 example: "123456789"
 *               password:
 *                 type: string
 *                 example: "mypassword123"
 *               ou:
 *                 type: string
 *                 example: "Admin"
 *     responses:
 *       200:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado correctamente en la base de datos y SOAP."
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Juan"
 *                     surname:
 *                       type: string
 *                       example: "Pérez"
 *                     email:
 *                       type: string
 *                       example: "juan.perez@example.com"
 *       400:
 *         description: Faltan parámetros requeridos
 *       401:
 *         description: Token inválido o expirado
 *       403:
 *         description: Permisos insuficientes para realizar la operación
 *       500:
 *         description: Error en el registro
 */
router.post('/register/:token', soapController.registerUser);

/**
 * @swagger
 * /edit/{token}:
 *   post:
 *     summary: Edita los datos de un usuario
 *     description: Permite a un administrador editar la información de un usuario existente.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al usuario administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - ou
 *               - name
 *               - surname
 *               - phone
 *               - document
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               ou:
 *                 type: string
 *                 example: "Admin"
 *               name:
 *                 type: string
 *                 example: "Juan"
 *               surname:
 *                 type: string
 *                 example: "Pérez"
 *               phone:
 *                 type: string
 *                 example: "+123456789"
 *               document:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Usuario editado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario editado correctamente."
 *       400:
 *         description: Faltan parámetros requeridos
 *       401:
 *         description: Token inválido o expirado
 *       403:
 *         description: Permisos insuficientes
 *       500:
 *         description: Error en la edición del usuario
 */
router.post('/edit/:token', soapController.editUser); 

/**
 * @swagger
 * /editme/{token}:
 *   post:
 *     summary: Edita la información de un usuario
 *     description: Permite a un usuario editar su propia información utilizando un token JWT para autenticación.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - ou
 *               - name
 *               - surname
 *               - phone
 *               - document
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               ou:
 *                 type: string
 *                 example: "User"
 *               name:
 *                 type: string
 *                 example: "Juan"
 *               surname:
 *                 type: string
 *                 example: "Pérez"
 *               phone:
 *                 type: string
 *                 example: "+123456789"
 *               document:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Usuario editado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario editado correctamente."
 *       400:
 *         description: Faltan parámetros requeridos o error en la edición
 *       401:
 *         description: Token inválido o expirado
 *       403:
 *         description: Permisos insuficientes para editar a otro usuario
 *       500:
 *         description: Error interno del servidor al editar el usuario
 */
router.post('/editme/:token', soapController.editUserMe);

/**
 * @swagger
 * /delete/{token}:
 *   post:
 *     summary: Elimina un usuario
 *     description: Permite a un administrador eliminar un usuario existente utilizando un token JWT para autenticación.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - ou
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               ou:
 *                 type: string
 *                 example: "Admin"
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado correctamente."
 *       400:
 *         description: Faltan parámetros requeridos o error en la eliminación
 *       401:
 *         description: Token inválido o expirado
 *       403:
 *         description: Permisos insuficientes para eliminar usuarios
 *       500:
 *         description: Error interno del servidor al eliminar el usuario
 */
router.post('/delete/:token', soapController.deleteUser);

/**
 * @swagger
 * /list/{ou}/{token}:
 *   post:
 *     summary: Lista usuarios
 *     description: Permite a un administrador listar todos los usuarios de una unidad organizativa (OU) utilizando un token JWT para autenticación.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: ou
 *         schema:
 *           type: string
 *         required: true
 *         description: Unidad organizativa para listar los usuarios
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT que identifica al administrador
 *     responses:
 *       200:
 *         description: Usuarios listados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuarios obtenidos correctamente."
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                       name:
 *                         type: string
 *                       surname:
 *                         type: string
 *       400:
 *         description: Faltan parámetros requeridos
 *       401:
 *         description: Token inválido o expirado
 *       403:
 *         description: Permisos insuficientes para listar usuarios
 *       500:
 *         description: Error interno del servidor al obtener la lista de usuarios
 */
router.post('/list/:ou/:token', soapController.listUsers);


/**
 * @swagger
 * /usuario/{email}:
 *   get:
 *     summary: Obtiene un usuario por su email
 *     description: Permite buscar un usuario específico utilizando su dirección de correo electrónico.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Dirección de correo electrónico del usuario que se desea buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario encontrado"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     name:
 *                       type: string
 *                       example: "Juan"
 *                     surname:
 *                       type: string
 *                       example: "Pérez"
 *                     phone:
 *                       type: string
 *                       example: "+123456789"
 *                     document:
 *                       type: string
 *                       example: "123456789"
 *       400:
 *         description: Falta el parámetro requerido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor al buscar el usuario
 */
router.get('/usuario/:email', soapController.getUserByEmail);

export default router; 

