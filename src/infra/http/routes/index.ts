import { Router } from "express";

import { todosRoutes } from "./todos.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use("/todo", todosRoutes)
router.use("/users", usersRoutes);
router.use(authenticateRoutes);


export { router };