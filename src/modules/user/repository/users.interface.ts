import { CreateUserDto } from "@modules/user/dtos/create-user.dto";
import { User } from "@prisma/client";
import { UpdateUserDto } from "../dtos/update-user.dto";

export interface IUsersRepository {
  create(data: CreateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(skip?: any, take?: any): Promise<{ data: User[]; totalItems?: number }>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  update(id: string, data: UpdateUserDto): Promise<User>;
}
