import { inject, injectable } from 'tsyringe';

import { Todo } from '../../entities/todo';
import { TodoRepository } from '../../repositories/todos-repository-interface';

@injectable()
class ListTodos {
  constructor(
    @inject("TodosRepository")
    private todosRepository: TodoRepository
  ) { }

  async execute(): Promise<Todo[]> {

    const todos = await this.todosRepository.listTodos()

    return todos;
  }
}

export { ListTodos };