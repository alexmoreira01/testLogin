import { Todo } from "../entities/todo";

interface TodoRepository {
    createTodo(todo: Todo): Promise<void>;
    listTodos() :Promise<Todo[]>;
    findTodoById(todoId: string): Promise<Todo | null>;
    findTodoByLabel(label: string): Promise<Todo | null>;
    listTodosByStatus(status: 'completed' | 'pending'): Promise<Todo[]>;
    updateTodo(todo: Todo): Promise<void>;
    deleteTodoById(todoId: string): Promise<void>;
}

export { TodoRepository };