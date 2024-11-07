// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación de la API del Webserver',
    },
    servers: [
      {
        url: 'https://sistema3.bucaramanga.upb.edu.co/', // Actualiza la URL base según tu configuración
        description: 'Servidor de Implementación',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta donde se encuentran tus archivos de ruta
};

const specs = swaggerJsdoc(options);

export default function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  
  // Agrega el console.log para indicar la disponibilidad de la documentación Swagger
  const port = process.env.PORT || 3000;
  console.log('Version 1 Docs are available at http://localhost:' + port + '/docs');
}
