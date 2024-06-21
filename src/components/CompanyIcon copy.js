import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Logo from "../assets/Logo.png";
import Link from "next/link";

function CompanyIcon({ setNavItem }) {
    return (
        <div>
            <Box
                mt={1}
                component={Link}
                href="/"
                onClick={() => setNavItem(null)}
            >
                <Stack direction={"row"}>
                    <Box>
                        <Image src={Logo} height={60} width={60} alt="logo" />
                    </Box>
                    <Box mt={1.5}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontFamily: "Poppins ",
                                flexGrow: 1,
                                color: "black",
                                fontWeight: "bolder",
                                fontStyle: "normal",
                                fontSize: 14,
                            }}
                        >
                            Weather <br /> Company
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </div>
    );
}

export default CompanyIcon;
