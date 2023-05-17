import { Router } from "express";

import { CreateTodoController } from "../controllers/create-todo-controller";
import { ListTodosController } from "../controllers/list-todos-controller";
import { FindTodoController } from "../controllers/find-todo-controller";
import { DeleteTodoController } from "../controllers/delete-todo-controller";
import { UpdateTodoController } from "../controllers/update-todo-controller";
import { ListTodoByStatusController } from "../controllers/list-todos-by-status-controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const todosRoutes = Router();

const createTodoController = new CreateTodoController();
const listTodoController = new ListTodosController();
const listTodoByStatusController = new ListTodoByStatusController();
const findTodoController = new FindTodoController();
const updateTodoController = new UpdateTodoController();
const deleteTodoController = new DeleteTodoController();

todosRoutes.post('/', ensureAuthenticated, createTodoController.handle);

todosRoutes.get('/', ensureAuthenticated, listTodoController.handle);

todosRoutes.get('/:status', listTodoByStatusController.handle);

todosRoutes.get('/find/:id', findTodoController.handle);

todosRoutes.put('/:id', updateTodoController.handle);

todosRoutes.delete('/:id', deleteTodoController.handle);

export { todosRoutes }