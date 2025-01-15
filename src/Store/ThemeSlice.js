import { createSlice, } from "@reduxjs/toolkit";

const loadThemeFromLocalStorage = () => {
    const savedTheme = localStorage.getItem("focusrappraisaltheme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  };

const initialState = {
light:{
sidebarcolorlight: "#f0f0f0",
contentpagelight:"#ffffff",
fontcolorlight:"rgb(75,75,75)"
},
dark:{
sidebarcolordark:"rgb(33,33,33)",
contentpagedark:"rgb(20,20,20 )",
// fontcolordark:"rgb(240,240,240)",
fontcolordark:"rgb(200,200,200)",
},
theme:loadThemeFromLocalStorage()
};

const themeSlice=createSlice({
    name:'theme',
    initialState,
    reducers:{
        // darktheme(state){
        //     state.sidebarcolordark;
        //     state.contentpagedark;
        //     state.theme;
        // },
        // lighttheme(state){
        //     state.sidebarcolorlight;
        //     state.contentpagelight;
        //     state.theme;
        // },
        toggletheme(state){
            state.theme = !state.theme;
            localStorage.setItem("focusrappraisaltheme", JSON.stringify(state.theme));
        }
    }
});


export default themeSlice;