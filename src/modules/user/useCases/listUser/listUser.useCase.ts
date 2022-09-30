import { IUsersRepository } from "@modules/user/repository/users.interface";
import { User } from "@prisma/client";
import { HttpError } from "@shared/errors/http.error";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListUserByIdUseCase {
  constructor(@inject("UsersRepository") private _repository: IUsersRepository) {}

  async execute(user_id: string): Promise<User> {
    const user = await this._repository.findById(user_id);

    if (!user) {
      throw new HttpError("User doest  exists!", 400);
    }

    return user;
  }
}
