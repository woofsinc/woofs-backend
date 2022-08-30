import { Router } from "express";

import { userRouter } from "./user/user.routes";

export const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 404
 *         message:
 *           type: string
 *           example: "User not found"
 */

router.use("/user", userRouter);
