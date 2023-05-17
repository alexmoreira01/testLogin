import { Todo as RawTodo } from '@prisma/client';
import { Todo } from '../../../../application/entities/todo';

export class PrismaTodoMapper {
  static toPrisma(todo: Todo) {
    return {
      id: todo.id,
      label: todo.label,
      status: todo.status,
      created_at: todo.created_at,
      updated_at: todo.updated_at,
    };
  }

  static toDomain(raw: RawTodo): Todo {
    return new Todo(
      {
        label: raw.label,
        status: raw.status,
        created_at: raw.created_at,
        updated_at: raw.updated_at
      },
      raw.id,
    );
  }
}
