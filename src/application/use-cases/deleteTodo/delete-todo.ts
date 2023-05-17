import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../infra/errors/app-error';

import { TodoRepository } from "../../repositories/todos-repository-interface";

@injectable()
class DeleteTodo {
  constructor(
    @inject("TodosRepository")
    private todosRepository: TodoRepository
  ) { }

  async execute(todoId: string): Promise<void> {
    const todoExists = await this.todosRepository.findTodoById(todoId);

    if (!todoExists) {
      throw new AppError("Todo not existing!");
    }

    await this.todosRepository.deleteTodoById(todoId);
  }
}

export { DeleteTodo };