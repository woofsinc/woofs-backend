import { UsersRepository } from "@modules/user/infra/repositories/users.repository";
import { PetRepository } from "@modules/pet/infra/repositories/pet.repository";
import { IUsersRepository } from "@modules/user/repository/users.interface";
import { IPetRepository } from "@modules/pet/repository/pet.interface";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<IPetRepository>("PetRepository", PetRepository);

container.register<PrismaClient>("PrismaClient", {
  useValue: new PrismaClient(),
});
