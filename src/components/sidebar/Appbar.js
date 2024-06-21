"use client";
import * as React from "react";
import { CssBaseline, AppBar, Toolbar, Typography, Box } from "@mui/material";
import AccountPopover from "./AccountPopover";

const Appabar = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CssBaseline />
            <AppBar
                sx={{
                    borderRadius: 40,
                    width: "80%",
                    margin: 2,
                    backgroundColor: "white",
                }}
                position="fixed"
                // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        bgcolor: "white",
                        borderRadius: 5,
                    }}
                >
                    <Box>
                        <AccountPopover />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Appabar;
