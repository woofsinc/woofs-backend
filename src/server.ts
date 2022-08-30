import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { logger } from "./utils/logger";

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

app.get("/", (req, res) => res.json({ message: "Welcome to Woofs API" }));

app.listen(PORT, () => logger.info(`✅ Server running on http://localhost:${PORT}`));
