import { Prisma } from "@prisma/client";
import { IsString, IsEmail, IsInt, IsOptional, IsDate, IsBoolean } from "class-validator";
import { UserEntity } from "@modules/user/infra/entities/user.entity";

export class CreateUserDto extends UserEntity {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  cpf: string;

  @IsString()
  phone: string;

  @IsInt()
  latitude: number;

  @IsInt()
  longitude: number;

  @IsInt()
  distanceLimit: number;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @IsOptional()
  pets?: Prisma.PetCreateNestedManyWithoutTutorInput;

  @IsDate()
  createdAt?: string | Date;

  @IsDate()
  updatedAt?: string | Date;
}
