import { Todo } from "../../../application/entities/todo";

export class TodoViewModel {
  static toHTTP(todo: Todo) {

    return {
      id: todo.id,
      label: todo.label,
      status: todo.status,
      created_at: todo.created_at,
      updated_at: todo.updated_at
    };
  }
}