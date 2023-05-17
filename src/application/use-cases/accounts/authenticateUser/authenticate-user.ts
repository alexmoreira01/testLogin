import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { DateProviderInterface } from "../../../../infra/container/providers/DateProvider/dateProvider-interface";
import { UserRepository } from "../../../repositories/users-repository-interface";
import { TokenRepository } from "../../../repositories/tokens-repository-interface";
import { AppError } from "../../../../infra/errors/app-error";
import { Token } from "../../../entities/token";

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
  refresh_token: string;
}

@injectable()
class AuthenticateUser {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UserRepository,
    @inject("TokensRepository")
    private tokensRepository: TokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: DateProviderInterface
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expires_in_token,
      secret_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    const tokenUser = new Token({
      refresh_token,
      expires_date: refresh_token_expires_date,
      user_id: user.id,
    })

    await this.tokensRepository.create(tokenUser);

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUser };
