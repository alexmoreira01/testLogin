import { Request, Response } from "express";

import { container } from "tsyringe";
import { FindTodo } from "../../../application/use-cases/findTodo/find-todo";
import { TodoViewModel } from "../view-models/todo-view-model";

class FindTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const todoId = request.params.id;

    const findTodo = container.resolve(FindTodo);

    const todo = await findTodo.execute(todoId);

    return response.json(TodoViewModel.toHTTP(todo));
  }
}

export { FindTodoController };