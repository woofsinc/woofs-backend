import { Router } from "express";

import { AuthenticateUserController } from "@modules/user/useCases/authenticateUser/authenticateUser.controller";

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

/**
 * @openapi
 * components:
 *   schemas:
 *     SessionsInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           example: 123456
 *     Session:
 *       type: object
 *       allOf:
 *         - $ref: '#/components/schemas/SessionsInput'
 *         - type: object
 *       properties:
 *         token:
 *           type: string
 */

/**
 * @openapi
 * /sessions:
 *  post:
 *    summary: Start a new session.
 *    description: Start a new session.
 *    tags:
 *      - User
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SessionsInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Session'
 *      404:
 *        $ref: '#/components/responses/404'
 *      500:
 *        $ref: '#/components/responses/500'
 */
authenticateRoutes.post("/sessions", authenticateUserController.handle);
