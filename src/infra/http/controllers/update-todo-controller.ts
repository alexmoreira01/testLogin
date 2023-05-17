import { Request, Response } from "express";

import { container } from "tsyringe";
import { UpdateTodo } from "../../../application/use-cases/updateTodo/update-todo";
import { TodoViewModel } from "../view-models/todo-view-model";

class UpdateTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const todoId = request.params.id;
    const { label, status } = request.body;

    const updateTodo = container.resolve(UpdateTodo);

    const { todo } = await updateTodo.execute({
      todoId,
      label,
      status
    });

    return response.status(200).json(TodoViewModel.toHTTP(todo));
  }
}

export { UpdateTodoController };