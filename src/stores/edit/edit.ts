// src/redux/slices/editSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Items
interface EditState {
  data: {};
}

const initialState: EditState = {
  data: {},
};

// CODE
const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    addEditData: (state, action) => {
      state.data = action.payload;
    },
    clearEditData: (state) => {
      state.data = {};
    },
  },
});

export const { addEditData, clearEditData } = editSlice.actions;
export default editSlice.reducer;
