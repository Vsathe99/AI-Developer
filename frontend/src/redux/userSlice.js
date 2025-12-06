import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.email = action.payload.email;
      state._id = action.payload._id;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
