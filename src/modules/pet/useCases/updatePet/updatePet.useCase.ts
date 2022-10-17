import { UpdatePetDto } from "@modules/pet/dtos/update-pet.dto";
import { IPetRepository } from "@modules/pet/repository/pet.interface";
import { Pet } from "@prisma/client";
import { HttpError } from "@shared/errors/http.error";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdatePetUseCase {
  constructor(@inject("PetRepository") private _repository: IPetRepository) {}

  async execute(id: string, data: UpdatePetDto): Promise<Pet> {
    const petData = await this._repository.findById(id);

    if (!petData) throw new HttpError("Pet does not exists!", 400);

    const pet = await this._repository.update(id, data);

    return pet;
  }
}
