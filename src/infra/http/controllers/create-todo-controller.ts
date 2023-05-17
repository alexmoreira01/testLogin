import { Request, Response } from "express";

import { container } from "tsyringe";

import { CreateTodo } from "../../../application/use-cases/createTodo/create-todo";
import { TodoViewModel } from "../view-models/todo-view-model";

class CreateTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { label } = request.body;

    const createTodo = container.resolve(CreateTodo);

    const { todo } = await createTodo.execute({
      label
    });

    return response.status(201).json(TodoViewModel.toHTTP(todo));
  }
}

export { CreateTodoController };