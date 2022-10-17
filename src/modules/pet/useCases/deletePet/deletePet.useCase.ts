import { IPetRepository } from "@modules/pet/repository/pet.interface";
import { HttpError } from "@shared/errors/http.error";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeletePetUseCase {
  constructor(@inject("PetRepository") private _repository: IPetRepository) {}

  async execute(id: string): Promise<void> {
    const pet = await this._repository.findById(id);

    if (!pet) {
      throw new HttpError("Pet doesn't  exists!", 400);
    }

    await this._repository.delete(id);
  }
}
