import { container } from "tsyringe";

import "./providers";

import { TodoRepository } from "../../application/repositories/todos-repository-interface";
import { PrismaTodosRepository } from "../database/prisma/repositories/prisma-todos-repository";
import { PrismaUsersRepository } from "../database/prisma/repositories/prisma-users-repository";
import { UserRepository } from "../../application/repositories/users-repository-interface";
import { PrismaTokensRepository } from "../database/prisma/repositories/prisma-tokens-repository";
import { TokenRepository } from "../../application/repositories/tokens-repository-interface";

container.registerSingleton<TodoRepository>(
  "TodosRepository",
  PrismaTodosRepository
)

container.registerSingleton<UserRepository>(
  "UsersRepository",
  PrismaUsersRepository
)

container.registerSingleton<TokenRepository>(
  "TokensRepository",
  PrismaTokensRepository
)