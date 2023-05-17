import { Request, Response } from "express";

import { container } from "tsyringe";
import { ListTodos } from "../../../application/use-cases/listTodos/list-todos";
import { TodoViewModel } from "../view-models/todo-view-model";

class ListTodosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTodos = container.resolve(ListTodos);

    const todos = await listTodos.execute();

    return response.json(todos.map(TodoViewModel.toHTTP));
  }
}

export { ListTodosController };