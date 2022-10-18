import { HttpError } from "@shared/errors/http.error";
import { UsersRepository } from "@modules/user/infra/repositories/users.repository";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;

  const _prisma = new PrismaClient();
  const prismaRepository = new UsersRepository(_prisma);

  const user = await prismaRepository.findById(id);

  if (!user.isAdmin) {
    throw new HttpError("User isn't admin");
  }

  return next();
}
