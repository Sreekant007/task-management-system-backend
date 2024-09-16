const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "This is task managment api build with express and node js",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerDefinition);
module.exports = swaggerSpec;
