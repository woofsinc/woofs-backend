import "reflect-metadata";

import "express-async-errors";

import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import "@shared/container";
import { router } from "@shared/infra/http/routes/router";
import { logger } from "@utils/logger";
import { swaggerSpec } from "@utils/swagger";
import { handleErrors } from "./middlewares/handleErrors";
import { HttpError } from "@shared/errors/http.error";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]", {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }),
);

app.get("/", (request, response) => response.json({ message: "Welcome to Woofs API" }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", router);
app.use(handleErrors);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof HttpError) {
    return response.status(err.status).json({
      message: err.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});
