import { Request, Response } from "express";

import { container } from "tsyringe";

import { DeleteTodo } from "../../../application/use-cases/deleteTodo/delete-todo";

class DeleteTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const todoId = request.params.id;

    const deleteTodo = container.resolve(DeleteTodo);

    await deleteTodo.execute(todoId);

    return response.status(204).send();
  }
}

export { DeleteTodoController };