import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshToken } from "../../../../application/use-cases/accounts/refreshToken/create-refreshToken";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshToken);

    const refresh_token = await refreshTokenUseCase.execute(token);

    return response.json(refresh_token);
  }
}

export { RefreshTokenController };
