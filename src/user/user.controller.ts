import { Request, Response } from "express";

import { HttpError } from "../errors/http.error";
import { userService } from "./user.service";

export const userController = {
  async listAll(request: Request, response: Response): Promise<Response> {
    const { _page, _items } = request.query;

    const page = isNaN(Number(_page)) ? 1 : Number(_page);
    const take = isNaN(Number(_items)) ? 10 : Number(_items);
    const skip = (page - 1) * take;

    const { data, count } = await userService.getUsers({ take, skip });

    const last = count <= page * take;

    return response.json({ page: Number(_page) || 1, data, last });
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
