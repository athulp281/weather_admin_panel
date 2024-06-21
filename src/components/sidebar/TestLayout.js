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
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { CompanyIcon } from "../CompanyIcon";
import { SidebarAvatar } from "./SidebarAvatar";
import useResponsive from "../Hooks/useResponsive";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import navConfig from "./navConfig";
import Link from "next/link";
import palette from "@/context/ThemeContext/palette";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import SidebarMenuItems from "./AppSideBar/SideBarMenuItems";

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
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 15px)`,
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

const AppBarStyled = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
        width: "100%",
    },
}));

const DrawerStyled = styled(MuiDrawer, {
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
    [theme.breakpoints.down("sm")]: {
        width: `calc(${theme.spacing(7)} + 1px)`,
        "& .MuiDrawer-paper": closedMixin(theme),
    },
}));

export default function TestLayout({ children }) {
    const smUp = useResponsive("up", "sm");
    const mdUp = useResponsive("up", "md");
    const pathname = usePathname();
    const router = useRouter();
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
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const renderNavItems = (items, isChild = false) => {
        return items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            return (
                <React.Fragment key={item.text || item.title}>
                    {hasChildren ? (
                        <ListItem
                            button
                            onClick={() => handleToggle(item.text)}
                            sx={{
                                marginTop: 1,
                                borderRadius: 4,
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                                },
                                backgroundColor: openItems[item.text]
                                    ? "rgba(0, 0, 0, 0.04)"
                                    : "inherit",
                                paddingLeft: isChild ? 4 : 2, // Indent child items
                            }}
                        >
                            {item.icon && !isChild && (
                                <ListItemIcon>{item.icon}</ListItemIcon>
                            )}
                            <ListItemText
                                primary={
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: isChild ? 10 : 12,
                                            fontFamily: "'Roboto', sans-serif",
                                            fontWeight: isChild
                                                ? "normal"
                                                : selectedPath === item.path
                                                ? "bolder"
                                                : "",
                                            textTransform: "uppercase",
                                            color: palette.grey[500],
                                        }}
                                    >
                                        {isChild ? (
                                            <span style={{ marginRight: 8 }}>
                                                •
                                            </span>
                                        ) : null}
                                        {item.text || item.title}
                                    </Typography>
                                }
                            />
                            {openItems[item.text] ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )}
                        </ListItem>
                    ) : (
                        <Link href={item.path} passHref>
                            <ListItem
                                button
                                selected={selectedPath === item.path}
                                onClick={() => handleListItemClick(item.path)}
                                sx={{
                                    marginTop: 1,
                                    borderRadius: 4,
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                                    },
                                    backgroundColor:
                                        selectedPath === item.path
                                            ? "#007fff !important"
                                            : "inherit",
                                    paddingLeft: isChild ? 4 : 2, // Indent child items
                                }}
                            >
                                {item.icon && !isChild && (
                                    <ListItemIcon
                                        sx={{
                                            color:
                                                selectedPath === item.path
                                                    ? "white"
                                                    : null,
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                )}
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontSize: isChild ? 10 : 12,
                                                fontFamily:
                                                    "'Roboto', sans-serif",
                                                fontWeight: isChild
                                                    ? "normal"
                                                    : selectedPath === item.path
                                                    ? "bolder"
                                                    : "",
                                                textTransform: "uppercase",
                                                color:
                                                    selectedPath === item.path
                                                        ? "white"
                                                        : palette.grey[500],
                                            }}
                                        >
                                            {isChild ? (
                                                <span
                                                    style={{ marginRight: 8 }}
                                                >
                                                    •
                                                </span>
                                            ) : null}
                                            {item.text || item.title}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </Link>
                    )}
                    {hasChildren && (
                        <Collapse
                            in={openItems[item.text]}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {renderNavItems(item.children, true)}
                            </List>
                        </Collapse>
                    )}
                </React.Fragment>
            );
        });
    };

    return (
        <>
            <Box sx={{ display: "flex", height: "100vh" }}>
                <CssBaseline />
                <AppBarStyled position="fixed" open={open}>
                    <Toolbar>
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
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Mini variant drawer
                        </Typography>
                    </Toolbar>
                </AppBarStyled>
                <DrawerStyled variant="permanent" open={open}>
                    <DrawerHeader>
                        <CompanyIcon />
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <DrawerContent>
                        <Box>
                            <Box>
                                <SidebarAvatar open={open} />
                            </Box>
                        </Box>

                        <Box sx={{ overflow: "auto" }}>
                            <Box padding={1}>
                                <List sx={{ lineHeight: 2 }}>
                                    {renderNavItems(navConfig)}
                                </List>
                            </Box>
                            <SidebarMenuItems />
                        </Box>
                    </DrawerContent>
                </DrawerStyled>
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
