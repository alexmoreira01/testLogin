import { Router } from "express";

import { CreateUserController } from "../controllers/accounts/create-user-controller";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };