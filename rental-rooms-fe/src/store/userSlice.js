import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userFirstName: null,
  userLastName: null,
  email: null,
  phoneNumber: null,
  roles: [],
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId || null;
      state.userFirstName = action.payload.userFirstName;
      state.userLastName = action.payload.userLastName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.roles = action.payload.roles || [];
      state.token = action.payload.token || null;
    },
    clearUser(state) {
      state.userId = null;
      state.userFirstName = null;
      state.userLastName = null;
      state.email = null;
      state.phoneNumber = null;
      state.roles = [];
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;