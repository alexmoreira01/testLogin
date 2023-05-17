import { inject, injectable } from 'tsyringe';

import { Todo } from '../../entities/todo';
import { TodoRepository } from '../../repositories/todos-repository-interface';

@injectable()
class ListTodosByStatus {
  constructor(
    @inject("TodosRepository")
    private todosRepository: TodoRepository
  ) { }

  async execute(status: 'completed' | 'pending'): Promise<Todo[]> {

    const statusTodos = await this.todosRepository.listTodosByStatus(status)

    return statusTodos;
  }
}

export { ListTodosByStatus };