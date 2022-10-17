import { CreatePetDto } from "@modules/pet/dtos/create-pet.dto";
import { Pet } from "@prisma/client";
import { UpdatePetDto } from "../dtos/update-pet.dto";

export interface IPetRepository {
  create(data: CreatePetDto): Promise<Pet>;
  delete(id: string): Promise<void>;
  findAll(skip?: number, take?: number): Promise<{ data: Pet[]; totalItems?: number }>;
  findById(id: string): Promise<Pet>;
  update(id: string, data: UpdatePetDto): Promise<Pet>;
}
