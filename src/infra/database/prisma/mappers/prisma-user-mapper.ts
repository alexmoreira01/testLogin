import { User as RawUser } from '@prisma/client';
import { User } from '../../../../application/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      avatar_url: user.avatar_url,
      created_at: user.created_at,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        isAdmin: raw.isAdmin,
        avatar_url: raw.avatar_url,
        created_at: raw.created_at,
      },
      raw.id,
    );
  }
}
