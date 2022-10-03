import { UpdateUserDto } from "@modules/user/dtos/update-user.dto";
import { IUsersRepository } from "@modules/user/repository/users.interface";
import { User } from "@prisma/client";
import { HttpError } from "@shared/errors/http.error";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUseCase {
  constructor(@inject("UsersRepository") private _repository: IUsersRepository) {}

  async execute(id: string, data: UpdateUserDto): Promise<User> {
    const userData = await this._repository.findById(id);

    if (!userData) throw new HttpError("User does not exists!", 400);

    const user = await this._repository.update(id, data);

    return user;
  }
}
