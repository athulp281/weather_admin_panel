// src/components/ThemeProviderWrapper.js
"use client"; // Ensure this file is treated as a client component

import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";
import ThemeProvider from "@/context/ThemeContext";

export default function ThemeProviderWrapper({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
