import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUser } from "../../../../application/use-cases/accounts/authenticateUser/authenticate-user";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserUseCase = container.resolve(
      AuthenticateUser
    );

    const token = await authenticateUserUseCase.execute({
      password,
      email,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };