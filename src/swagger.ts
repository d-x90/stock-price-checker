import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { HOST_NAME, PORT } from './config';
import { Express } from 'express';

export const setupSwagger = (app: Express) => {
  const options = {
    swaggerDefinition: {
      openapi: '3.1.0',
      info: {
        title: 'Stock Price Checker Express API with Swagger',
        version: '0.1.0',
        description:
          'This is a simlple node application made with Express and documented with Swagger',
        license: {
          name: 'MIT',
          url: 'https://spdx.org/licenses/MIT.html'
        },
        contact: {
          name: 'David Horvath',
          url: '',
          email: 'work.dhorvath@gmail.com'
        }
      },
      servers: [
        {
          url: `http://${HOST_NAME}:${PORT}`
        }
      ]
    },
    apis: ['./**/routes/*']
  };

  const swaggerDocs = swaggerJsdoc(options);
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, { explorer: true })
  );
};
