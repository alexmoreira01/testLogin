import { TodosRepositoryInMemory } from "../../../../test/repositories/in-memory-todos-repository";

import { CreateTodo } from "../createTodo/create-todo";
import { ListTodos } from "./list-todos";

let createTodo: CreateTodo;
let listTodos: ListTodos;
let todosRepositoryInMemory: TodosRepositoryInMemory;

describe("List todos", () => {
  beforeEach(() => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodo = new CreateTodo(todosRepositoryInMemory);
    listTodos = new ListTodos(todosRepositoryInMemory);
  });

  it('should be able to list all todos', async () => {
    await createTodo.execute({
      label: "label a todoOne",
    });

    await createTodo.execute({
      label: "label a todoTwo",
    });

    const todos = await listTodos.execute();

    expect(todos).toHaveLength(2);
    expect(todos[0].label).toEqual("label a todoOne");
    expect(todos[1].label).toEqual("label a todoTwo");
  });
})