import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        cache: {},
        query: ""
    },
    reducers:{
        cacheResults: function(state,action){
            state.cache = {...state.cache, [state.query] : action.payload};
        },
        setQuery: function(state,action){
            state.query = action.payload
        },
    }

})

export default searchSlice.reducer;
export const {cacheResults,setQuery} = searchSlice.actions;
