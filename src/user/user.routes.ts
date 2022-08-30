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
 *           type: integer
 *           example: 0
 *         name:
 *           type: string
 *           example: Leanne Graham
 *         email:
 *           type: string
 *           example: leanne@gmail.com
 *         password:
 *           type: string
 *           example: 123456
 *         cpf:
 *           type: string
 *           example: 12345678900
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
 *    description: Get a list of users.
 *    tags:
 *      - User
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/User'
 */
userRouter.get("/", userController.listAll);

/**
 * @openapi
 * /user/{id}:
 *  get:
 *    description: Get an user.
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
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *      404:
 *        description: User not found
 *        content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Error'
 */
userRouter.get("/:id", userController.getOne);
