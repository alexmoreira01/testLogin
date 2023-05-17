import { TodoRepository } from "../../src/application/repositories/todos-repository-interface";
import { Todo } from "../../src/application/entities/todo";

export class TodosRepositoryInMemory implements TodoRepository {
  todos: Todo[] = [];

  async createTodo(todo: Todo): Promise<void> {
    this.todos.push(todo);
  }

  async listTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async findTodoById(todoId: string): Promise<Todo> {
    const todo = this.todos.find(
      (item) => item.id === todoId,
    );

    if (!todo) {
      return null;
    }

    return todo;
  }
  
  async findTodoByLabel(label: string): Promise<Todo> {
    const todo = this.todos.find(
      (item) => item.label === label,
    );

    if (!todo) {
      return null;
    }

    return todo
  }

  async listTodosByStatus(status: "completed" | "pending"): Promise<Todo[]> {
    const todo = this.todos.filter(
      (item) => item.status === status,
    );

    if (!todo) {
      return null;
    }

    return todo;
  }

  async updateTodo(todo: Todo): Promise<void> {
    const todoIndex = this.todos.findIndex(
      (item) => item.id === todo.id
    );

    if (todoIndex >= 0) {
      this.todos[todoIndex] = todo;
    }
  }

  async deleteTodoById(todoId: string): Promise<void> {
    const todos = this.todos.filter((item) => item.id !== todoId);

    this.todos = todos
  }
}