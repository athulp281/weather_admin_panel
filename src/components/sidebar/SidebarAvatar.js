import { Avatar, Box, Link, Typography, styled } from "@mui/material";
import React from "react";

export const SidebarAvatar = ({ open }) => {
    const AccountStyle = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2, 2.5),
        borderRadius: Number(theme.shape.borderRadius) * 2,
        backgroundColor: open ? "#edf4fb" : null,
    }));
    return (
        <>
            <Box sx={{ mt: 5, mx: open ? 2.5 : 0 }}>
                <AccountStyle>
                    <Avatar
                        src={`https://www.interactivebrokers.co.in/images/web/hero-microsite-fund-admin.jpg`}
                        alt="photoURL"
                    />
                    {open ? (
                        <Box sx={{ marginLeft: 1 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: "black",
                                    fontWeight: "bolder",
                                }}
                            >
                                WEBSITE ADMIN
                            </Typography>
                            <Typography
                                variant="subtitle3"
                                sx={{
                                    color: "#c3c9cf",
                                    textTransform: "capitalize",
                                    width: "100%",
                                    fontSize: "14px",
                                }}
                            >
                                Admin
                            </Typography>
                        </Box>
                    ) : null}
                </AccountStyle>
            </Box>
        </>
    );
};
