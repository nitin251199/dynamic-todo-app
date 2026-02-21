import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../@types";

interface rootInterface {
  selectedTodo: Todo | undefined;
  showTodoForm: boolean;
}

const initialState: rootInterface = {
  selectedTodo: undefined,
  showTodoForm: false,
};

export const tempReducer = createSlice({
  name: "temp",
  initialState,
  reducers: {
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
    setShowTodoForm: (state, action) => {
      state.showTodoForm = action.payload;
    },
  },
});

export const { setSelectedTodo, setShowTodoForm } =
  tempReducer.actions;

export default tempReducer.reducer;
