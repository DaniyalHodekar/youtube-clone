import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    name: "",
    likedVideos: [],
    subscriptions: [],
    subUrls: {},
  },
  reducers: {
    setLogin: function (state) {
      state.isLoggedIn = true;
    },
    addVideo: function (state, action) {
      if (state.likedVideos.includes(action.payload)) return;
      state.likedVideos.push(action.payload);
    },
    removeVideo: function (state, action) {
      state.likedVideos = state.likedVideos.filter((video) => {
        video.id !== action.payload;
      });
    },
    addSubscription: function (state, action) {
      if (state.subscriptions.includes(action.payload)) return;
      state.subscriptions.push(action.payload);
    },
    removeSub: function (state, action) {
      let newSubs = state.subscriptions.filter((sub) => {
        return sub !== action.payload;
      });
      state.subscriptions = [...newSubs];
    },
    setName: function (state, action) {
      state.name = action.payload;
    },
    addSubUrl: function (state, action) {
      state.subUrls = {
        ...state.subUrls,
        [action.payload[0]]: action.payload[1],
      };
    },
  },
});

export default loginSlice.reducer;
export const {
  setLogin,
  addVideo,
  addSubscription,
  removeVideo,
  removeSub,
  setName,
  addSubUrl,
} = loginSlice.actions;
