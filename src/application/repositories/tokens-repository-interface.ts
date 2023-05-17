import { Token } from "../entities/token";

interface TokenRepository {
  create(token: Token): Promise<Token>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<Token>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<Token>;
}

export { TokenRepository };