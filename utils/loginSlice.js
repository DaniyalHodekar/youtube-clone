import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    likedVideos: [],
    subscriptions: [],
  },
  reducers: {
    setLogin: function (state) {
      state.isLoggedIn = true;
    },
    addVideo: function (state, action) {
      state.likedVideos.push(action.payload);
      if (state.likedVideos.length > 20) {
        state.likedVideos = [...state.likedVideos.slice(1, 19)];
      }
    },
    addSubscription: function (state, action) {
      state.subscriptions.push(action.payload);
      if (state.subscriptions.length > 20) {
        state.subscriptions = [...state.subscriptions.slice(1, 19)];
      }
    },
  },
});

export default loginSlice.reducer;
export const { setLogin, addVideo, addSubscription } = loginSlice.actions;
