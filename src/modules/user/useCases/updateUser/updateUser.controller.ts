import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./updateUser.useCase";

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;

    const updateUserUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUserUseCase.execute(id, data);

    return response.status(200).json(user);
  }
}
