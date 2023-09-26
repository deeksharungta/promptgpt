import { createSlice } from "@reduxjs/toolkit";

const setupSlice = createSlice({
  name: "setup",
  initialState: {
    projectName: "",
    description: "",
    prompt: "",
    domain: "",
    key: "",
    position: "",
    theme: "",
  },
  reducers: {
    setSetupData(state, action) {
      state.projectName = action.payload.projectName;
      state.description = action.payload.description;
      state.prompt = action.payload.prompt;
      state.domain = action.payload.domain;
      state.key = action.payload.key;
      state.position = action.payload.position;
      state.theme = action.payload.theme;
    },
  },
});

export const setupActions = setupSlice.actions;

export default setupSlice;
