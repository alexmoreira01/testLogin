import { TodosRepositoryInMemory } from "../../../../test/repositories/in-memory-todos-repository";

import { CreateTodo } from "../createTodo/create-todo";
import { UpdateTodo } from "../updateTodo/update-todo";
import { ListTodosByStatus } from "./list-todos-by-status";

let createTodo: CreateTodo;
let updateTodo: UpdateTodo
let listTodosByStatus: ListTodosByStatus;
let todosRepositoryInMemory: TodosRepositoryInMemory;

describe("List todos", () => {
  beforeEach(() => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodo = new CreateTodo(todosRepositoryInMemory);
    updateTodo = new UpdateTodo(todosRepositoryInMemory);
    listTodosByStatus = new ListTodosByStatus(todosRepositoryInMemory);
  });

  it('should be able to list all todos', async () => {
    const { todo } = await createTodo.execute({
      label: "label a todoOne",
    });

    await createTodo.execute({
      label: "label a todoTwo",
    });

    await updateTodo.execute({
      todoId: todo.id,
      label: "label update",
      status: "completed"
    })

    const todos = await listTodosByStatus.execute("completed");

    expect(todos).toHaveLength(1);
    expect(todos[0].label).toEqual("label update");
    expect(todos[0].status).toEqual("completed");
  });
})