import TaskList from "../todos/TaskList";
import TodoForm from "../todos/TodoForm";

function Main() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 rounded-xl bg-gray-100 p-6 shadow-md">
      <TodoForm />
      <TaskList />
    </main>
  );
}

export default Main;
