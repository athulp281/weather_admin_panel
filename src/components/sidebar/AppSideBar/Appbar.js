import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
    styled,
} from "@mui/material";
import React, { useEffect } from "react";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import AccountPopover from "../AccountPopover";
import MobileSideBar from "./MobileSideBar";
import useResponsive from "@/components/Hooks/useResponsive";

const Appbar = ({ open, setOpen }) => {
    const smUp = useResponsive("up", "sm");
    const mdUp = useResponsive("up", "md");

    useEffect(() => {
        if (smUp) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [smUp]);

    const drawerWidth = 270;
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "white",
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: smUp ? drawerWidth : 0,
            width: `calc(100% - ${smUp ? drawerWidth : 0}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: open ? "flex-end" : "space-between",
                }}
            >
                {smUp ? (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon sx={{ color: "black" }} />
                    </IconButton>
                ) : (
                    <MobileSideBar />
                )}

                <Box>
                    <AccountPopover />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
