"use client"; // Ensure this file is treated as a client component
import "@fontsource/roboto";

import * as React from "react";
import { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    CssBaseline,
    Toolbar,
    Box,
    ListItemIcon,
    Typography,
    Collapse,
    Divider,
    styled,
    Container,
} from "@mui/material";
import Link from "next/link";
import Appabar from "./Appbar";
import { CompanyIcon } from "../CompanyIcon";
import { SidebarAvatar } from "./SidebarAvatar";
import navConfig from "./navConfig";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import palette from "@/context/ThemeContext/palette";
import { usePathname, useRouter } from "next/navigation";
import ThemeProviderWrapper from "../ThemeProviderWrapper";
import useResponsive from "../Hooks/useResponsive";

const drawerWidth = 280;

const SidebarLayout = ({ children }) => {
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
        <Box>
            <CssBaseline />
            <Appabar />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <CompanyIcon />
                <Toolbar />
                <Box>
                    <SidebarAvatar />
                </Box>
                <Box
                    sx={{
                        width: "90%",
                        marginLeft: 2,
                    }}
                >
                    <Divider
                        sx={{
                            borderBottomWidth: 2,
                            borderStyle: "dashed",
                        }}
                    />
                </Box>

                <Box sx={{ overflow: "auto" }}>
                    <Box padding={1}>
                        <List sx={{ lineHeight: 2 }}>
                            {renderNavItems(navConfig)}
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                <Box component="main">{children}</Box>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    p: 3,
                }}
            >
                {" "}
                <Toolbar />
            </Box>
        </Box>
    );
};

export default SidebarLayout;
