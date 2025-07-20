import { useEffect } from "react";
import useTodoStore from "@/store/todoStore";
import TodoItem from "./TodoItem";

function TaskList() {
  const { todos, isLoading, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <ul className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-4">
      {isLoading ? (
        <li className="text-center italic text-gray-500">Loading tasks...</li>
      ) : todos.length === 0 ? (
        <li className="text-center italic text-gray-500">
          You don’t have any tasks yet. Let’s get productive!
        </li>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </ul>
  );
}

export default TaskList;
