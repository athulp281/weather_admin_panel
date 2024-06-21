// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "Your Font Family, Arial, sans-serif",
        h1: {
            fontStyle: "italic",
        },
        h2: {
            fontStyle: "italic",
        },
        body1: {
            fontStyle: "normal",
        },
        // Add more typography settings as needed
    },
});

export default theme;
