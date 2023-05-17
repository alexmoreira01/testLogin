import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../infra/errors/app-error';
import { PrismaTodoMapper } from '../../../infra/database/prisma/mappers/prisma-todo-mapper';

import { Todo } from '../../entities/todo';
import { TodoRepository } from '../../repositories/todos-repository-interface';

@injectable()
class FindTodo {
  constructor(
    @inject("TodosRepository")
    private todosRepository: TodoRepository
  ) { }

  async execute(todoId: string): Promise<Todo> {

    const todoExists = await this.todosRepository.findTodoById(todoId)

    if (!todoExists) {
      throw new AppError("Todo not existing!");
    }

    return todoExists;
  }
}

export { FindTodo };