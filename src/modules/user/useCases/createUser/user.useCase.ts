import { User } from "@prisma/client";
import { HttpError } from "@shared/errors/http.error";
import { hash } from "bcryptjs";

import { CreateUserDto } from "@modules/user/dtos/create-user.dto";
import { IUsersRepository } from "@modules/user/repository/users.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCase {
  constructor(@inject("UsersRepository") private _repository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    cpf,
    phone,
    latitude,
    longitude,
    distanceLimit,
  }: CreateUserDto): Promise<User> {
    const userAlreadExists = await this._repository.findByEmail(email);

    if (userAlreadExists) {
      throw new HttpError("User already exists!", 400);
    }

    const passwordHash = await hash(password, 10);

    const user = await this._repository.create({
      name,
      email,
      password: passwordHash,
      cpf,
      phone,
      latitude,
      longitude,
      distanceLimit,
    });

    return user;
  }
}
