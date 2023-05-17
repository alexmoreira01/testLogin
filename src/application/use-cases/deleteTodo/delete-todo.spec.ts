import { TodosRepositoryInMemory } from "../../../../test/repositories/in-memory-todos-repository";
import { AppError } from "../../../infra/errors/app-error";

import { CreateTodo } from "../createTodo/create-todo";
import { DeleteTodo } from "./delete-todo";

let createTodo: CreateTodo;
let deleteTodo: DeleteTodo;
let todosRepositoryInMemory: TodosRepositoryInMemory;

describe("Delete todo", () => {
  beforeEach(() => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodo = new CreateTodo(todosRepositoryInMemory);
    deleteTodo = new DeleteTodo(todosRepositoryInMemory);
  });

  it('should be able to delete a todo by id', async () => {
    const { todo } = await createTodo.execute({
      label: "label a todo delete",
    });

    await deleteTodo.execute(todo.id);

    expect(todosRepositoryInMemory.todos).toHaveLength(0);
  });

  it("should not be able to delete todo not existing", async () => {
    await expect(
      deleteTodo.execute("5ea08d52-abee-4881-9b23-9d3f266")
    ).rejects.toEqual(new AppError("Todo not existing!"));
  })
})