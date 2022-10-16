import { container } from "tsyringe";
import { Request, Response } from "express";

import { DeleteUserUseCase } from "./deleteUser.useCase";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listAllUsersUseCase = container.resolve(DeleteUserUseCase);
    await listAllUsersUseCase.execute(id);

    return response.status(200).send();
  }
}
