import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../infra/errors/app-error';
import { DateProviderInterface } from "../../../../infra/container/providers/DateProvider/dateProvider-interface";
import { TokenRepository } from '../../../repositories/tokens-repository-interface';
import auth from "../../../../config/auth";
import { Token } from "../../../entities/token";
import { TokenViewModel } from "../../../../infra/http/view-models/token-view-model";

interface IRequest {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshToken {
  constructor(
    @inject("TokensRepository")
    private tokensRepository: TokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: DateProviderInterface
  ) { }

  async execute(token: string): Promise<ITokenResponse> {
 
    const { email, sub } = verify(
      token,
      auth.secret_refresh_token
    ) as IRequest;

    const user_id = sub;

    const userToken = await this.tokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    // console.log(userToken) // Token vem igual a entidade

    const userTokenView = TokenViewModel.toHTTP(userToken)

    if (!userTokenView) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.tokensRepository.deleteById(userTokenView.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    const data = new Token ({
      refresh_token: refresh_token,
      expires_date: expires_date,
      user_id: user_id,
    });

    await this.tokensRepository.create(
      data
    );

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}


export { RefreshToken };