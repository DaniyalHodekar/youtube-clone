import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    name: "",
    likedVideos: [],
    subscriptions: [],
  },
  reducers: {
    setLogin: function (state) {
      state.isLoggedIn = true;
    },
    addVideo: function (state, action) {
      if (state.likedVideos.includes(action.payload)) return;
      state.likedVideos.push(action.payload);
    },
    addSubscription: function (state, action) {
      if (state.subscriptions.includes(action.payload)) return;
      state.subscriptions.push(action.payload);
    },
    setName: function (state, action) {
      state.name = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { setLogin, addVideo, addSubscription, setName } =
  loginSlice.actions;
