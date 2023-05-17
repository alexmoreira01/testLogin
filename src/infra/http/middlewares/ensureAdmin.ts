import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app-error";
import { PrismaUsersRepository } from "../../database/prisma/repositories/prisma-users-repository";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new PrismaUsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't admin!");
  }

  return next();
}