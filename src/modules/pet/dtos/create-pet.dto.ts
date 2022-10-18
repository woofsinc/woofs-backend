import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsString, IsUUID } from "class-validator";
import { PetEntity } from "@modules/pet/infra/entities/pet.entity";
import { Prisma } from "@prisma/client";

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export class CreatePetDto extends PetEntity {
  @IsUUID()
  id?: string;

  @IsString()
  name: string;

  @IsEnum(Gender, { each: true })
  gender: Gender;

  @IsString()
  breed: string;

  @IsInt()
  age: number;

  @IsString()
  about: string;

  @IsString()
  @IsArray()
  pictures: string[];

  @IsBoolean()
  vaccination: boolean;

  @IsString()
  tutorId: string;

  @IsDate()
  createdAt?: string | Date;

  @IsDate()
  updatedAt?: string | Date;
}
