import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useResponsive from "@/components/Hooks/useResponsive";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CompanyIcon from "@/components/CompanyIcon";
import { SidebarAvatar } from "../SidebarAvatar";
import navConfig from "../navConfig";
import SidebarMenuItems from "./SideBarMenuItems";
import SmallSidebarMenuItems from "./SmallSideBarMenuItems";
import Appbar from "./Appbar";

const drawerWidth = 270;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 26px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 18px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
const DrawerContent = styled("div")({
    height: "100%", // Ensure the DataGrid's container takes up the available height
    display: "flex",
    flexDirection: "column", // Ensure proper layout for the content
});
// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(["width", "margin"], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function AppSideBar({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const smUp = useResponsive("up", "sm");
    const mdUp = useResponsive("up", "md");

    const [selectedPath, setSelectedPath] = useState(pathname);
    const [openItems, setOpenItems] = useState({});

    const handleListItemClick = (path) => {
        if (path) {
            setSelectedPath(path);
        }
    };

    const handleToggle = (item) => {
        setOpenItems((prev) => ({
            ...prev,
            [item]: !prev[item],
        }));
    };

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />

                <Appbar open={open} setOpen={setOpen} />
                {smUp ? (
                    <Drawer
                        variant="permanent"
                        open={open}
                        sx={{ overflow: "hidden" }}
                    >
                        <DrawerHeader>
                            <Box
                                sx={{
                                    marginRight: 8,
                                }}
                            >
                                <CompanyIcon />
                            </Box>

                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === "rtl" ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <ChevronLeftIcon />
                                )}
                            </IconButton>
                        </DrawerHeader>

                        <DrawerContent>
                            <Box>
                                <Box>
                                    <SidebarAvatar open={open} />
                                </Box>
                            </Box>
                            <Divider
                                sx={{
                                    marginTop: 8,
                                    borderBottomWidth: 2,
                                    borderStyle: "dashed",
                                }}
                            />
                            <Box sx={{ overflow: "auto" }}>
                                <Box padding={1}>
                                    <List
                                        sx={{ lineHeight: 2 }}
                                        onMouseEnter={() => setOpen(true)}
                                        onMouseLeave={() => {
                                            if (open) {
                                            } else {
                                                setOpen(false);
                                            }
                                        }}
                                    >
                                        {open ? (
                                            <SidebarMenuItems />
                                        ) : (
                                            <SmallSidebarMenuItems
                                                setOpen={setOpen}
                                            />
                                        )}
                                    </List>
                                </Box>
                            </Box>
                        </DrawerContent>
                    </Drawer>
                ) : null}
                <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                    <Box component="main">
                        <DrawerHeader />
                        {children}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
