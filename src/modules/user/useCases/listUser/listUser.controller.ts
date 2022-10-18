import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserByIdUseCase } from "./listUser.useCase";

export class ListUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listUserByUserUseCase = container.resolve(ListUserByIdUseCase);

    const user = await listUserByUserUseCase.execute(id);

    delete user.password;

    return response.status(200).json(user);
  }
}
