import { Prisma } from "@prisma/client";

export class UserEntity implements Prisma.UserCreateInput {
  id?: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  latitude: number;
  longitude: number;
  distanceLimit: number;
  isAdmin?: boolean;
  pets?: Prisma.PetCreateNestedManyWithoutTutorInput;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
