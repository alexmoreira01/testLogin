import { User } from "../entities/user";

interface UserRepository {
  create(data: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { UserRepository };