import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../@types";

interface rootInterface {
  todos: Todo[];
}

const initialState: rootInterface = {
  todos: [],
};

export const rootReducer = createSlice({
  name: "root",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [action.payload, ...state.todos];
    },
    updateTodo: (state, action: PayloadAction<Partial<Todo>>) => {
      const { id, ...updatedData } = action.payload;
      state.todos = state.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, ...updatedData };
        }
        return todo;
      });
    },
    deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.todos = state.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, deleted: true };
        }
        return todo;
      });
    },
    undoDeleteTodo: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.todos = state.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, deleted: false };
        }
        return todo;
      });
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, undoDeleteTodo } =
  rootReducer.actions;

export default rootReducer.reducer;
