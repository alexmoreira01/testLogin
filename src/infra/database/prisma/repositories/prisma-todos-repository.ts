import { Todo } from "../../../../application/entities/todo";
import { TodoRepository } from "../../../../application/repositories/todos-repository-interface";
import { PrismaTodoMapper } from "../mappers/prisma-todo-mapper";
import prismaService from "../prisma-service";

class PrismaTodosRepository implements TodoRepository {

  private prisma = prismaService

  async createTodo(todo: Todo): Promise<void> {
    const raw = PrismaTodoMapper.toPrisma(todo);

    await this.prisma.todo.create({
      data: raw,
    })
  }

  async listTodos(): Promise<Todo[]> {
    const allTodos = await this.prisma.todo.findMany({
      orderBy: {
        created_at: 'desc',
      }
    });

    return allTodos.map((todo) => {
      return PrismaTodoMapper.toDomain(todo);
    });
  }

  async findTodoById(todoId: string): Promise<Todo | null> {
    const todoExists = await this.prisma.todo.findUnique({
      where: {
        id: todoId
      },
    });

    if (!todoExists) {
      return null
    }

    return PrismaTodoMapper.toDomain(todoExists);
  }

  async findTodoByLabel(label: string): Promise<Todo | null> {
    const todo = await this.prisma.todo.findUnique({
      where: {
        label: label,
      },
    });

    if (!todo) {
      return null;
    }

    return PrismaTodoMapper.toDomain(todo)
  }

  async listTodosByStatus(status: 'completed' | 'pending'): Promise<Todo[]> {
    const allTodosStatus = await this.prisma.todo.findMany({
      where: {
        status: status,
      },
      orderBy: {
        created_at: 'desc',
      }
    });

    return allTodosStatus.map((todo) => {
      return PrismaTodoMapper.toDomain(todo);
    });
  }

  async updateTodo(todo: Todo): Promise<void> {
    const raw = PrismaTodoMapper.toPrisma(todo);

    await this.prisma.todo.update({
      where: {
        id: raw.id,
      },
      data: raw
    })
  }

  async deleteTodoById(todoId: string): Promise<void> {
    await this.prisma.todo.delete({
      where: {
        id: todoId,
      }
    });
  }
}

export { PrismaTodosRepository }