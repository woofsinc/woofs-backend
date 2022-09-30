import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./listAll.useCase";

export class ListAllUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { _page, _limit } = request.query;

    const page = isNaN(Number(_page)) ? 1 : Number(_page);
    const limit = isNaN(Number(_limit)) ? 10 : Number(_limit);
    const skip = (page - 1) * limit;

    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);
    const { data, totalItems } = await listAllUsersUseCase.execute({
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;

    return response.json({ data, page, itemsPerPage: limit, totalItems, totalPages, hasNextPage });
  }
}
