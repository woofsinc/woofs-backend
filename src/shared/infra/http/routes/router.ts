import { authenticateRoutes } from "./authenticate.routes";
import { Router } from "express";

import { userRouter } from "./user.routes";
import { petRouter } from "./pet.routes";

export const router = Router();

/**
 * @openapi
 * components:
 *   responses:
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      404:
 *        description: Not Found Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Not Found Error
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 500
 *                message:
 *                  type: string
 *                  example: Internal Server Error
 *   schemas:
 *     Pagination:
 *       type: object
 *       properties:
 *         page:
 *           type: number
 *           example: 1
 *         itemsPerPage:
 *           type: number
 *           example: 10
 *         totalItems:
 *           type: number
 *           example: 100
 *         totalPages:
 *           type: number
 *           example: 10
 *         hasNextPage:
 *           type: boolean
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: Bad Request
 */

router.use("/user", userRouter);
router.use("/pet", petRouter);
router.use("/sessions", authenticateRoutes);
