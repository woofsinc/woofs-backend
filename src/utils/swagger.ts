import { writeFileSync } from "fs";

import swaggerJSDoc from "swagger-jsdoc";

import { version } from "../../package.json";

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Woofs API Documentation",
      version,
      description: "This is a REST API application made with Express.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Development server",
    },
  ],
  apis: ["./src/routes.ts", "./src/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
writeFileSync("swagger.json", JSON.stringify(swaggerSpec, null, 2));
