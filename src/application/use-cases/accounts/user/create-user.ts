import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { AppError } from '../../../../infra/errors/app-error';
import { UserRepository } from '../../../repositories/users-repository-interface';
import { User } from '../../../entities/user';

interface IRequest {
  name: string;
  password: string;
  email: string;
}

@injectable()
class CreateUser {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UserRepository
  ) { }

  async execute({ name, email, password }: IRequest): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = new User({
      name: name,
      email: email,
      password: passwordHash,
    });

    await this.usersRepository.create(user);
  }
}

export { CreateUser };