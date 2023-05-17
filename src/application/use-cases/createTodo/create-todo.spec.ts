import { TodosRepositoryInMemory } from "../../../../test/repositories/in-memory-todos-repository";
import { AppError } from "../../../infra/errors/app-error";
import { CreateTodo } from "./create-todo";

let createTodo: CreateTodo;
let todosRepositoryInMemory: TodosRepositoryInMemory;

describe("Create todo", () => {
    beforeEach(() => {
        todosRepositoryInMemory = new TodosRepositoryInMemory();
        createTodo = new CreateTodo(todosRepositoryInMemory)
    }); 

    it('should be able to create a new todo', async () => {
        const { todo } = await createTodo.execute({
            label: "label a todo",
        });

        expect(todo).toHaveProperty("id");
        expect(todosRepositoryInMemory.todos).toHaveLength(1);
    });

    it("should not be able to create a todo with title equals", async () => {
        await createTodo.execute({
            label: "labelTest",
        }); 

        await expect(
            createTodo.execute({
                label: "labelTest",
            })
        ).rejects.toEqual(new AppError("Todo already exists!"));
    })
})