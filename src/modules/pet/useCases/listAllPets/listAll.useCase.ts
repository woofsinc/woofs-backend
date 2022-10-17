import { IPetRepository } from "@modules/pet/repository/pet.interface";
import { Pet } from "@prisma/client";
import { HttpError } from "@shared/errors/http.error";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllPetsUseCase {
  constructor(@inject("PetRepository") private _repository: IPetRepository) {}

  async execute(params: {
    skip: number;
    take: number;
  }): Promise<{ data?: Pet[]; totalItems?: number }> {
    const { skip, take } = params;
    const pets = await this._repository.findAll(skip, take);

    if (!pets) {
      throw new HttpError("There is no pet registered in the database", 404);
    }

    return pets;
  }
}
