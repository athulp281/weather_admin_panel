import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import useResponsive from "@/components/Hooks/useResponsive";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import navConfig from "../navConfig";
import palette from "@/context/ThemeContext/palette";

function SidebarMenuItems({ setOpen }) {
    const smUp = useResponsive("up", "sm");
    const mdUp = useResponsive("up", "md");
    const pathname = usePathname();
    const router = useRouter();
    const [selectedPath, setSelectedPath] = useState(pathname);
    const [openItems, setOpenItems] = useState({});

    const handleListItemClick = (item) => {
        if (item.path) {
            setSelectedPath(item.path);
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
                                onClick={() => handleListItemClick(item)}
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
    return <>{renderNavItems(navConfig)}</>;
}

export default SidebarMenuItems;
