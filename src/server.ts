import "express-async-errors";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { handleErrors } from "./middleware/handleErrors";
import { router } from "./router";
import { logger } from "./utils/logger";
import { swaggerSpec } from "./utils/swagger";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3333;

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

app.use("/", router);
app.use(handleErrors);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  logger.info(`✅ Server running on http://localhost:${PORT}`);
  logger.info(`📃 Docs available on http://localhost:${PORT}/docs`);
});
