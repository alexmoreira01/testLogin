import { Request, Response } from "express";

import { container } from "tsyringe";
import { ListTodosByStatus } from "../../../application/use-cases/listTodosByStatus/list-todos-by-status";
import { TodoViewModel } from "../view-models/todo-view-model";
import { AppError } from "../../errors/app-error";

class ListTodoByStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const validStatuses = ["pending", "completed"];

    const status = request.params.status;

    if (!validStatuses.includes(status)) {
      throw new AppError("Invalid status");
    }

    const listTodoByStatus = container.resolve(ListTodosByStatus);

    const statusTodos = await listTodoByStatus.execute(status);

    return response.json(statusTodos.map(TodoViewModel.toHTTP));
  }
}

export { ListTodoByStatusController };