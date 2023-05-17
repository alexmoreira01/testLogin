import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../infra/errors/app-error';

import { Todo } from '../../entities/todo';
import { TodoRepository } from '../../repositories/todos-repository-interface';

interface IRequest {
    todoId: string;
    label: string;
    status: 'completed' | 'pending';
}

interface IResponse {
    todo: Todo
}

@injectable()
class UpdateTodo {
    constructor(
        @inject("TodosRepository")
        private todosRepository: TodoRepository
    ) { }

    async execute({ todoId, label, status }: IRequest): Promise<IResponse> {
        const todoAlreadyExists = await this.todosRepository.findTodoById(todoId);

        if (!todoAlreadyExists) {
            throw new AppError("Todo not exists!");
        }

        let todoUpdate = todoAlreadyExists;

        todoUpdate.label = label;
        todoUpdate.status = status;
        todoUpdate.updatedAt();

        await this.todosRepository.updateTodo(todoUpdate);

        return {
            todo: todoUpdate
        }
    }
}

export { UpdateTodo };