import { Request, Response } from "express";

import { HttpError } from "../errors/http.error";
import { userService } from "./user.service";

export const userController = {
  async listAll(request: Request, response: Response): Promise<Response> {
    const { _page, _limit } = request.query;

    const page = isNaN(Number(_page)) ? 1 : Number(_page);
    const limit = isNaN(Number(_limit)) ? 10 : Number(_limit);
    const skip = (page - 1) * limit;

    const { data, totalItems } = await userService.getUsers({
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;

    return response.json({ data, page, itemsPerPage: limit, totalItems, totalPages, hasNextPage });
  },

  async getOne(request: Request, response: Response) {
    const { id } = request.params;

    const user = await userService.getUserById(id);

    if (!user) {
      throw new HttpError("Não existe usuário com a id informada", 404);
    }

    return response.json(user);
  },
};
