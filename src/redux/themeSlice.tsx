"use client";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const defaultThemeSettings = {
  "data-bs-theme": "light",
  "data-sidebar": "light",
  "data-color": "primary",
  "data-topbar": "white",
  "data-layout": "default",
  "data-size": "default",
  "data-width": "fluid",
  "data-sidebarbg": "none",
  "dir": "ltr",
};


// Safe localStorage access with error handling
const getInitialThemeSettings = () => {
  try {
    const stored = Cookies.get("themeSettings");
    return stored ? JSON.parse(stored) : defaultThemeSettings;
  } catch (error) {
    console.warn("Failed to parse theme settings from localStorage:", error);
    return defaultThemeSettings;
  }
};

const initialState = {
  themeSettings: getInitialThemeSettings(),
};


const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, { payload }) => {
      if (payload.dir === "rtl") {
        state.themeSettings = { ...defaultThemeSettings, dir: "rtl" };
      } else if (state.themeSettings.dir === "rtl" && (payload.dir === "ltr" || !payload.hasOwnProperty("dir"))) {
        state.themeSettings = { ...defaultThemeSettings, ...payload, dir: "ltr" };
      } else {
        state.themeSettings = { ...state.themeSettings, ...payload };
      }


      try {
        Cookies.set(
          "themeSettings",
          JSON.stringify(state.themeSettings)
        );
      } catch (error) {
        console.warn("Failed to save theme settings to localStorage:", error);
      }
    },
    resetTheme: (state) => {
      state.themeSettings = defaultThemeSettings;
      try {
        Cookies.remove("themeSettings");
      } catch (error) {
        console.warn("Failed to remove theme settings from localStorage:", error);
      }
    },
  },
});


export const { updateTheme, resetTheme } = themeSlice.actions;


export default themeSlice.reducer;





