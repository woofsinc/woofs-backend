import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(morgan("dev"));

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.json({ message: "Woofs" }));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
