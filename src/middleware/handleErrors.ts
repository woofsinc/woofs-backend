/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { HttpError } from "../errors/http.error";
import { logger } from "../utils/logger";

export function handleErrors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  logger.info(error);
  if (error instanceof HttpError) {
    logger.error(`${error.status} - ${error.message}`);
    return response.status(error.status).json({ status: error.status, message: error.message });
  }

  logger.error(`500 - ${error.message}`);
  return response.status(500).json({ status: 500, message: "Oops... Algo deu errado :(" });
}
