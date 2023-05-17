import { User } from "../../../../application/entities/user";
import { UserRepository } from "../../../../application/repositories/users-repository-interface";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import prismaService from "../prisma-service";

class PrismaUsersRepository implements UserRepository {
  private prisma = prismaService

  async create(data: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(data);

    await this.prisma.user.create({
      data: raw
    })
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email 
      },
    })

    if(!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id 
      },
    })

    if(!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}

export { PrismaUsersRepository }