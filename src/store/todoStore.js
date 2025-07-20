import { create } from "zustand";
import supabase from "@/services/supabase";
import { toast } from "sonner";

const useTodoStore = create((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    set({ isLoading: true, error: null });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      toast.error("Failed to get current user");
      return set({ error: userError.message, isLoading: false });
    }

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch todos");
      return set({ error: error.message, isLoading: false });
    }

    set({ todos: data, isLoading: false });
  },

  addTodo: async (newTodo) => {
    set({ isLoading: true, error: null });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("Not authenticated");
      return set({ error: userError.message, isLoading: false });
    }

    const { data, error } = await supabase
      .from("todos")
      .insert([{ ...newTodo, user_id: user.id }])
      .select()
      .single();

    if (error) {
      toast.error("Failed to add todo");
      return set({ error: error.message, isLoading: false });
    }

    toast.success("Todo added successfully");
    set((state) => ({ todos: [data, ...state.todos], isLoading: false }));
  },

  deleteTodo: async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete todo");
      return set({ error: error.message });
    }

    toast.success("Todo deleted");
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  updateTodo: async (id, updatedFields) => {
    const { data, error } = await supabase
      .from("todos")
      .update(updatedFields)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      toast.error("Failed to update todo");
      return set({ error: error.message });
    }

    toast.success("Todo updated");
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? data : todo)),
    }));
  },

  toggleComplete: async (id, completed) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ completed })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      toast.error("Failed to toggle todo status");
      return set({ error: error.message });
    }

    toast.success(`Todo marked as ${completed ? "complete" : "incomplete"}`);
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? data : todo)),
    }));
  },
}));

export default useTodoStore;
