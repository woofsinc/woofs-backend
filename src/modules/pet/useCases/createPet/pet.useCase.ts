import { Pet } from "@prisma/client";

import { CreatePetDto } from "@modules/pet/dtos/create-pet.dto";
import { IPetRepository } from "@modules/pet/repository/pet.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreatePetUseCase {
  constructor(@inject("PetRepository") private _repository: IPetRepository) {}

  async execute({
    name,
    about,
    age,
    breed,
    gender,
    pictures,
    tutorId,
    vaccination,
  }: CreatePetDto): Promise<Pet> {
    const pet = await this._repository.create({
      name,
      about,
      age,
      breed,
      gender,
      pictures,
      tutorId,
      vaccination,
    });

    return pet;
  }
}
