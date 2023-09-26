import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript types for your state and action payloads
type UserState = {
  user: any, // You can replace 'any' with the actual type of your user data
  loading: boolean,
};

type SetUserPayload = {
  user: any, // Replace 'any' with the actual type of your user data
};

type SetLoadingPayload = {
  loading: boolean,
};

const initialState: UserState = {
  user: {},
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SetUserPayload>) {
      state.user = action.payload.user;
    },
    setLoading(state, action: PayloadAction<SetLoadingPayload>) {
      state.loading = action.payload.loading;
    },
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
