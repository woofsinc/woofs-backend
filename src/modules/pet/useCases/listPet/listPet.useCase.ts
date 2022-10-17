import { IPetRepository } from "@modules/pet/repository/pet.interface";
import { Pet } from "@prisma/client";
import { HttpError } from "@shared/errors/http.error";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListPetByIdUseCase {
  constructor(@inject("PetRepository") private _repository: IPetRepository) {}

  async execute(pet_id: string): Promise<Pet> {
    const pet = await this._repository.findById(pet_id);

    if (!pet) throw new HttpError("Pet doesn't  exists!", 400);

    return pet;
  }
}
