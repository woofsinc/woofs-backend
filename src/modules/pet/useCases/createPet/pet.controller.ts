import { Request, Response } from "express";

import { container } from "tsyringe";
import { CreatePetUseCase } from "./pet.useCase";

export class CreatePetController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    const createPetUseCase = container.resolve(CreatePetUseCase);

    const pet = await createPetUseCase.execute(body);

    return response.status(201).json(pet);
  }
}
