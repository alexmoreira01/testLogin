import { Token } from "@prisma/client";

export class TokenViewModel {
  static toHTTP(token: Token) {

    return {
      id: token.id,
      refresh_token: token.refresh_token,
      user_id: token.user_id,
      expires_date: token.expires_date,
      created_at: token.created_at,
    };
  }
}