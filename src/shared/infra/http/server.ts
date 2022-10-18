import { logger } from "@utils/logger";
import { app } from "./app";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  logger.info(`✅ Server running on http://localhost:${PORT}`);
  logger.info(`📃 Docs available on http://localhost:${PORT}/docs`);
});
