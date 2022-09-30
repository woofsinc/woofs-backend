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

  async findAll(skip?: any, take?: any): Promise<{ data: User[]; totalItems: number }> {
    const totalItems = await this._prisma.user.count();
    console.log(skip, take);
    const users = await this._prisma.user.findMany({ skip: skip, take: take });
    return { data: users, totalItems };
  }

  async findById(id: string): Promise<User> {
    const user = await this._prisma.user.findUnique({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this._prisma.user.findUnique({ where: { email } });
    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this._prisma.user.update({ where: { id }, data });
    return user;
  }
}
