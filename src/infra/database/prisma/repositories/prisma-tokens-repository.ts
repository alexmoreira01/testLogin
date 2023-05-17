import { Token } from "../../../../application/entities/token";
import { TokenRepository } from "../../../../application/repositories/tokens-repository-interface";
import { PrismaTokenMapper } from "../mappers/prisma-token-mapper";
import prismaService from "../prisma-service";

class PrismaTokensRepository implements TokenRepository {
  private prisma = prismaService

  async create(data: Token): Promise<Token> {
    const raw = PrismaTokenMapper.toPrisma(data);

    await this.prisma.token.create({
      data: raw,
    })

    return PrismaTokenMapper.toDomain(raw);

  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<Token> {
    const usersTokens = await this.prisma.token.findFirst({
      where: {
        user_id: user_id,
        refresh_token: refresh_token
      }
    });

    if (!usersTokens) {
      return null
    }

    return PrismaTokenMapper.toDomain(usersTokens)
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.token.delete({
      where: {
        id: id,
      }
    });
  }

  async findByRefreshToken(refresh_token: string): Promise<Token> {
    const userToken = await this.prisma.token.findFirst({
      where: {
        refresh_token: refresh_token,
      },
    });

    if (!userToken) {
      return null;
    }

    return PrismaTokenMapper.toDomain(userToken)
  }
}

export { PrismaTokensRepository }