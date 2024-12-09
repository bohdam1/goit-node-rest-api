const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API Documentation', // Назва API
      version: '1.0.0', // Версія API
      description: 'Документація для мого проекту',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL вашого сервера
      },
    ],
  },
  apis: ['../routes/*.js'], // Шлях до файлів з описом API
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
