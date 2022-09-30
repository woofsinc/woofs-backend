import { UsersRepository } from "@modules/user/infra/repositories/users.repository";
import { IUsersRepository } from "@modules/user/repository/users.interface";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);

container.register<PrismaClient>("PrismaClient", {
  useValue: new PrismaClient(),
});
