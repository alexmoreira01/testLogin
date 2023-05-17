import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../infra/errors/app-error';

import { Todo } from '../../entities/todo';
import { TodoRepository } from '../../repositories/todos-repository-interface';

interface IRequest {
  label: string;
}

interface IResponse {
  todo: Todo
}

@injectable()
class CreateTodo {
  constructor(
    @inject("TodosRepository")
    private todosRepository: TodoRepository
  ) { }

  async execute({ label }: IRequest): Promise<IResponse> {

    const todoAlreadyExists = await this.todosRepository.findTodoByLabel(label);

    if (todoAlreadyExists) {
      throw new AppError("Todo already exists!");
    }

    const todo = new Todo({
      label: label,
      status: 'pending',
      updated_at: null
    });

    await this.todosRepository.createTodo(todo);

    return {
      todo
    }
  }
}

export { CreateTodo };