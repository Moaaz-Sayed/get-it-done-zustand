import useTodoStore from "@/store/todoStore";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SpinnerMini from "../ui/SpinnerMini";

function TodoForm() {
  const [newTodo, setNewTodo] = useState("");
  const { isAdding, addTodo } = useTodoStore();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTodo) return;
    await addTodo({ title: newTodo });
    setNewTodo("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch"
    >
      <Input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new task"
        size="md"
        className="flex-1"
        autoFocus
      />

      <Button
        type="submit"
        size="lg"
        className="bg-purple-500 hover:bg-purple-700"
        disabled={isAdding}
      >
        {isAdding ? <SpinnerMini /> : "Add Task"}
      </Button>
    </form>
  );
}

export default TodoForm;
