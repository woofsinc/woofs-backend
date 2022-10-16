import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUserUseCase } from "./authenticateUser.useCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUserUseCase);

    const token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(token);
  }
}
