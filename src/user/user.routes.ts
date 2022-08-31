import { Router } from "express";

import { userController } from "./user.controller";

export const userRouter = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Leanne Graham
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           example: 123456
 *         cpf:
 *           type: string
 *           example: 08684930070
 *         phone:
 *           type: string
 *           example: 79999999999
 *         latitude:
 *           type: float
 *           example: -10.43875
 *         longitude:
 *           type: float
 *           example: -10.43875
 *         distanceLimit:
 *           type: integer
 *           example: 50
 */

/**
 * @openapi
 * /user:
 *  get:
 *    summary: Get a list of users.
 *    description: Get a paginated list of users.
 *    tags:
 *      - User
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      500:
 *        $ref: '#/components/responses/500'
 */
userRouter.get("/", userController.listAll);

/**
 * @openapi
 * /user/{id}:
 *  get:
 *    summary: Get an user.
 *    description: Get an user by it's id.
 *    tags:
 *      - User
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The id of the user to retrieve
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        $ref: '#/components/responses/404'
 *      500:
 *        $ref: '#/components/responses/500'
 */
userRouter.get("/:id", userController.getOne);
