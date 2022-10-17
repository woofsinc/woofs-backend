import { container } from "tsyringe";
import { Request, Response } from "express";

import { DeletePetUseCase } from "./deletePet.useCase";

export class DeletePetController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deltetePetUseCase = container.resolve(DeletePetUseCase);
    await deltetePetUseCase.execute(id);

    return response.status(200).send();
  }
}
