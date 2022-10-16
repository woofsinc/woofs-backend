import { IUsersRepository } from "@modules/user/repository/users.interface";
import { HttpError } from "@shared/errors/http.error";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteUserUseCase {
  constructor(@inject("UsersRepository") private _repository: IUsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this._repository.findById(id);

    if (!user) {
      throw new HttpError("User doesn't  exists!", 400);
    }

    await this._repository.delete(id);
  }
}
