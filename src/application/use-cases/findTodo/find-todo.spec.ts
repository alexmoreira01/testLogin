import { TodosRepositoryInMemory } from "../../../../test/repositories/in-memory-todos-repository";
import { AppError } from "../../../infra/errors/app-error";

import { CreateTodo } from "../createTodo/create-todo";
import { FindTodo } from "./find-todo";

let createTodo: CreateTodo;
let findTodo: FindTodo;
let todosRepositoryInMemory: TodosRepositoryInMemory;

describe("Find todo", () => {
  beforeEach(() => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodo = new CreateTodo(todosRepositoryInMemory);
    findTodo = new FindTodo(todosRepositoryInMemory);
  });

  it('should be able to find todo by id', async () => {
    const { todo } = await createTodo.execute({
      label: "label a todo find",
    });

    const findTodoById = await findTodo.execute(todo.id);

    expect(findTodoById.id).toEqual(todo.id);
    expect(findTodoById.label).toEqual("label a todo find");
  });

  it("should not be able to find todo not existing", async () => {
    await expect(
      findTodo.execute("5ea08d52-abee-4881-9b23-9d3f266")
    ).rejects.toEqual(new AppError("Todo not existing!"));
  })
})