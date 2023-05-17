import { TodosRepositoryInMemory } from "../../../../test/repositories/in-memory-todos-repository";
import { AppError } from "../../../infra/errors/app-error";
import { CreateTodo } from "../createTodo/create-todo";
import { UpdateTodo } from "./update-todo";

let createTodo: CreateTodo;
let updateTodo: UpdateTodo;
let todosRepositoryInMemory: TodosRepositoryInMemory;

describe("Update todo", () => {
  beforeEach(() => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodo = new CreateTodo(todosRepositoryInMemory);
    updateTodo = new UpdateTodo(todosRepositoryInMemory);
  });

  it('should be able to update a todo', async () => {
    const { todo } = await createTodo.execute({
      label: "label a todo",
    });

    await updateTodo.execute({
      todoId: todo.id,
      label: "label update",
      status: "completed"
    })

    expect(todosRepositoryInMemory.todos).toHaveLength(1);
    expect(todosRepositoryInMemory.todos[0].label).toEqual("label update");
    expect(todosRepositoryInMemory.todos[0].status).toEqual("completed");

  });

  it("should not be able to update a todo not exists", async () => {

    await expect(
      updateTodo.execute({
        todoId: "0b1492ce-865b-4477-92cd-b810e0597",
        label: "label update",
        status: "completed"
      })
    ).rejects.toEqual(new AppError("Todo not exists!"));
  })
})