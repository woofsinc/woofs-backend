import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPetByIdUseCase } from "./listPet.useCase";

export class ListPetController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listPetByUserUseCase = container.resolve(ListPetByIdUseCase);

    const pet = await listPetByUserUseCase.execute(id);

    return response.status(200).json(pet);
  }
}
