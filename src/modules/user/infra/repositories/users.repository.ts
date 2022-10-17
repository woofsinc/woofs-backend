import { CreateUserDto } from "@modules/user/dtos/create-user.dto";
import { UpdateUserDto } from "@modules/user/dtos/update-user.dto";
import { IUsersRepository } from "@modules/user/repository/users.interface";
import { PrismaClient, User } from "@prisma/client";
import { inject, singleton } from "tsyringe";

@singleton()
export class UsersRepository implements IUsersRepository {
  constructor(@inject("PrismaClient") private readonly _prisma: PrismaClient) {}

  async create(data: CreateUserDto): Promise<User> {
    const user = await this._prisma.user.create({
      data,
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await this._prisma.user.delete({ where: { id } });
  }

  async findAll(skip?: number, take?: number): Promise<{ data: User[]; totalItems: number }> {
    const totalItems = await this._prisma.user.count();
    const users = await this._prisma.user.findMany({ skip: skip, take: take });
    return { data: users, totalItems };
  }

  async findById(id: string): Promise<User> {
    const user = await this._prisma.user.findUnique({ where: { id: id } });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this._prisma.user.findUnique({ where: { email } });
    console.log(user);
    return user;
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this._prisma.user.findFirst({ where: { cpf: cpf } });
    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this._prisma.user.update({ where: { id }, data });
    return user;
  }
}
