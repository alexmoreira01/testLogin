import { Token as RawToken } from "@prisma/client";
import { Token } from "../../../../application/entities/token";

export class PrismaTokenMapper {
  static toPrisma(token: Token) {
    return {
      id: token.id,
      refresh_token: token.refresh_token,
      user_id: token.user_id,
      expires_date: token.expires_date,
      created_at: token.created_at
    };
  }

  static toDomain(raw: RawToken): Token {
    return new Token(
      {
        refresh_token: raw.refresh_token,
        user_id: raw.user_id,
        expires_date: raw.expires_date,
        created_at: raw.created_at
      },
      raw.id
    )
  }
}