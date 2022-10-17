import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdatePetUseCase } from "./updatePet.useCase";

export class UpdatePetController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body;

    const updatePetUseCase = container.resolve(UpdatePetUseCase);

    const pet = await updatePetUseCase.execute(id, data);

    return response.status(200).json(pet);
  }
}
