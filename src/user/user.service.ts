import { User } from "@prisma/client";

import { prisma } from "../prisma";

export const userService = {
  async getUsers(params: {
    skip: number;
    take: number;
  }): Promise<{ data: User[]; totalItems: number }> {
    const { skip, take } = params;

    const totalItems = await prisma.user.count();
    const data = await prisma.user.findMany({
      skip,
      take,
    });

    return { data, totalItems };
  },

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  },
};
