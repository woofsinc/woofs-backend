import { IUsersRepository } from "@modules/user/repository/users.interface";
import { User } from "@prisma/client";
import { HttpError } from "@shared/errors/http.error";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAllUsersUseCase {
  constructor(@inject("UsersRepository") private _repository: IUsersRepository) {}

  async execute(params: {
    skip: number;
    take: number;
  }): Promise<{ data?: User[]; totalItems?: number }> {
    const { skip, take } = params;
    const users = await this._repository.findAll(skip, take);

    if (!users) {
      throw new HttpError("There is no user registered in the database", 404);
    }

    return users;
  }
}
