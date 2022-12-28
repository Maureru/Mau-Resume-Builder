import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    darkMode: boolean
} = {
    darkMode: localStorage.getItem("theme") ? localStorage.getItem("theme") === "false" ? false : true : false
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            const newMode = state.darkMode ? false : true
            localStorage.setItem("theme", JSON.stringify(newMode))
            return {darkMode: state.darkMode ? false : true}
        }
    }
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer