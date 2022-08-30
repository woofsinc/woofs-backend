import { User } from "@prisma/client";

import { prisma } from "../prisma";

export const userService = {
  async getUsers(params: { skip: number; take: number }): Promise<{ data: User[]; count: number }> {
    const { skip, take } = params;

    const data = await prisma.user.findMany({
      skip,
      take,
    });

    const count = await prisma.user.count();

    return { data, count };
  },

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  },
};
