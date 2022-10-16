import { Router } from "express";

import { CreateUserController } from "@modules/user/useCases/createUser/user.controller";
import { ListUserController } from "@modules/user/useCases/listUser/listUser.controller";
import { ListAllUserController } from "@modules/user/useCases/listAllUsers/listAll.controller";
import { UpdateUserController } from "@modules/user/useCases/updateUser/updateUser.controller";
import { DeleteUserController } from "@modules/user/useCases/deleteUser/deleteUser.controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const userRouter = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const listAllUsersController = new ListAllUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

/**
 * @openapi
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       properties:
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
 *     User:
 *       type: object
 *       allOf:
 *         - $ref: '#/components/schemas/UserInput'
 *         - type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /user/create:
 *  post:
 *    summary: Register a new User.
 *    description: Register a new User.
 *    tags:
 *      - User
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserInput'
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
userRouter.post("/create", createUserController.handle);
userRouter.use(ensureAuthenticated);
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
userRouter.get("/:id", listUserController.handle);

/**
 * @openapi
 * /user:
 *  get:
 *    summary: Get a list of users.
 *    description: Get a paginated list of users.
 *    tags:
 *      - User
 *    parameters:
 *      - name: _page
 *        in: query
 *        required: true
 *      - name: _limit
 *        in: query
 *        required: true
 *        description: The id of the user to retrieve
 *        schema:
 *          type: number
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              allOf:
 *                - $ref: '#/components/schemas/Pagination'
 *                - type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/User'
 *      500:
 *        $ref: '#/components/responses/500'
 */
userRouter.get("/", listAllUsersController.handle);

/**
 * @openapi
 * /user/{id}:
 *  delete:
 *    summary: Delete an user.
 *    description: Delete an user by it's id.
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
 *      404:
 *        $ref: '#/components/responses/404'
 *      500:
 *        $ref: '#/components/responses/500'
 */
userRouter.delete("/:id", deleteUserController.handle);

/**
 * @openapi
 * /user/{id}:
 *  put:
 *    summary: Update an user.
 *    description: Update an user by it's id.
 *    tags:
 *      - User
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The id of the user to retrieve
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/User'
 *      404:
 *        $ref: '#/components/responses/404'
 *      500:
 *        $ref: '#/components/responses/500'
 */
userRouter.put("/:id", updateUserController.handle);
