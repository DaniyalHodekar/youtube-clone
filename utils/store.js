import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import loginSlice from "./loginSlice";
const store = configureStore({
    reducer:{
        app: appSlice,
        search: searchSlice,
        login: loginSlice
    }
});

export default store;