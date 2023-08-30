import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState:{
        isMenuOpen:false,
        isMobileSearchOpen:false
    },
    reducers:{
        toggleMenu: function(state) {
            state.isMenuOpen = !state.isMenuOpen
        },
        setMobileSearch: function(state,action) {
            state.isMobileSearchOpen = action.payload
        }
    }
})

export default appSlice.reducer;
export const { toggleMenu, setMobileSearch } = appSlice.actions;




