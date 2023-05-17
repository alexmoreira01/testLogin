import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUser } from "../../../../application/use-cases/accounts/user/create-user";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserUseCase = container.resolve(CreateUser);

    await createUserUseCase.execute({
      name,
      email,
      password
    });

    return response.status(201).send();
  }
}

export { CreateUserController };