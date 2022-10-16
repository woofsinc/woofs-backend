import { HttpError } from "@shared/errors/http.error";
import { IUsersRepository } from "@modules/user/repository/users.interface";
import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUserUseCase {
  constructor(@inject("UsersRepository") private _repository: IUsersRepository) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this._repository.findByEmail(email);

    if (!user) throw new HttpError("Email or password incorrect!", 400);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new HttpError("Password incorrect!", 400);

    const token = sign({}, "4b95e4787fcead483cfcd9e423a6e228", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}
