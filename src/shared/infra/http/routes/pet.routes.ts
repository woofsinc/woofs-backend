import { Router } from "express";

import { CreatePetController } from "@modules/pet/useCases/createPet/pet.controller";
import { ListPetController } from "@modules/pet/useCases/listPet/listPet.controller";
import { ListAllPetsController } from "@modules/pet/useCases/listAllPets/listAll.controller";
import { UpdatePetController } from "@modules/pet/useCases/updatePet/updatePet.controller";
import { DeletePetController } from "@modules/pet/useCases/deletePet/deletePet.controller";

export const petRouter = Router();

const createPetController = new CreatePetController();
const listPetController = new ListPetController();
const listAllPetsController = new ListAllPetsController();
const updatePetController = new UpdatePetController();
const deletePetController = new DeletePetController();

petRouter.post("/create", createPetController.handle);
petRouter.get("/:id", listPetController.handle);
petRouter.get("/", listAllPetsController.handle);
petRouter.put("/:id", updatePetController.handle);
petRouter.delete("/:id", deletePetController.handle);
