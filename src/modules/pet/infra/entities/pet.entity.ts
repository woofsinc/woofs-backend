import { Gender, Prisma } from "@prisma/client";

export class PetEntity implements Prisma.PetUncheckedCreateInput {
  id?: string;
  name: string;
  gender: Gender;
  breed: string;
  age: number;
  about: string;
  pictures?: Prisma.PetCreatepicturesInput | Prisma.Enumerable<string>;
  vaccination?: boolean;
  tutorId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
