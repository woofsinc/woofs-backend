import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListAllPetsUseCase } from "./listAll.useCase";

export class ListAllPetsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { _page, _limit } = request.query;

    const page = isNaN(Number(_page)) ? 1 : Number(_page);
    const limit = isNaN(Number(_limit)) ? 10 : Number(_limit);
    const skip = (page - 1) * limit;

    const listAllPetsUseCase = container.resolve(ListAllPetsUseCase);
    const { data, totalItems } = await listAllPetsUseCase.execute({
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    return response.json({ data, page, itemsPerPage: limit, totalItems, totalPages, hasNextPage });
  }
}
