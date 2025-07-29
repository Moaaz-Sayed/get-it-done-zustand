import useTodoStore from "@/store/todoStore";
import { HiCheck, HiPencil, HiTrash } from "react-icons/hi2";
import { formatDistanceFromNow } from "../../utils/helpers";
import CustomAlertDialog from "../ui/CustomAlertDialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

function TodoItem({ todo }) {
  const { deleteTodo, updateTodo, toggleComplete } = useTodoStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    deleteTodo(todo.id);
  };
  const handleComplete = () => {
    toggleComplete(todo.id, !todo.completed);
  };

  function handleEdit(e) {
    e.preventDefault();
    const updatedTitle = e.target.elements.title.value;
    updateTodo(todo.id, { title: updatedTitle });
    setIsOpen(false);
  }

  return (
    <>
      <li
        className={`flex flex-col justify-between gap-4 rounded-xl px-6 py-4 shadow transition hover:shadow-md sm:flex-row sm:items-center ${
          todo.completed ? "bg-gray-50" : "bg-white"
        }`}
      >
        <div className="flex-1">
          <p
            className={`text-lg font-medium ${
              todo.completed ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {todo.title}
          </p>
          <p className="text-sm text-gray-500">
            {formatDistanceFromNow(todo.created_at)}
          </p>
        </div>

        <div className="flex gap-3 self-end text-xl text-gray-600 sm:self-auto">
          <HiCheck
            className={`cursor-pointer transition hover:scale-110 ${
              todo.completed ? "text-green-500 opacity-50" : "text-red-500"
            }`}
            title="Mark as complete"
            onClick={handleComplete}
          />

          {/* Delete Modal */}
          <CustomAlertDialog
            onConfirm={handleDelete}
            title="Delete todo?"
            description="Are you sure you want to delete this todo? This action cannot be undone."
            cancelText="Cancel"
            trigger={
              <HiTrash
                className="cursor-pointer text-red-500 transition hover:scale-110"
                title="Delete"
              />
            }
          />

          {/* Edit Modal */}

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <HiPencil
                className="cursor-pointer transition hover:scale-110"
                title="Edit"
                onClick={() => setIsOpen(true)}
              />
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>
                  Update your todo and save changes
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleEdit}>
                <input
                  name="title"
                  defaultValue={todo.title}
                  className="w-full border p-2 rounded"
                />

                <DialogFooter className="mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <DialogClose asChild>
                    <button type="button" className="text-gray-500">
                      Cancel
                    </button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </li>
    </>
  );
}

export default TodoItem;
