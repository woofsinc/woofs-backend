import { CreatePetDto } from "@modules/pet/dtos/create-pet.dto";
import { UpdatePetDto } from "@modules/pet/dtos/update-pet.dto";
import { IPetRepository } from "@modules/pet/repository/pet.interface";
import { Pet, PrismaClient } from "@prisma/client";
import { inject, singleton } from "tsyringe";

@singleton()
export class PetRepository implements IPetRepository {
  constructor(@inject("PrismaClient") private readonly _prisma: PrismaClient) {}

  async create(data: CreatePetDto): Promise<Pet> {
    const pet = await this._prisma.pet.create({ data });

    return pet;
  }

  async delete(id: string): Promise<void> {
    await this._prisma.pet.delete({ where: { id } });
  }

  async findAll(skip?: number, take?: number): Promise<{ data: Pet[]; totalItems: number }> {
    const totalItems = await this._prisma.pet.count();
    const pets = await this._prisma.pet.findMany({ skip: skip, take: take });
    return { data: pets, totalItems };
  }

  async findById(id: string): Promise<Pet> {
    const pet = await this._prisma.pet.findUnique({ where: { id: id } });
    return pet;
  }

  async update(id: string, data: UpdatePetDto): Promise<Pet> {
    const pet = await this._prisma.pet.update({ where: { id }, data });
    return pet;
  }
}
