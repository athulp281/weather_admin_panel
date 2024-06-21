"use client";
import { styled } from "@mui/material/styles";
import { Card, Container, Typography, Stack, Box, Button } from "@mui/material";
// components
import Link from "next/link";
// sections

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

import CompanyIcon from "@/components/CompanyIcon";
import useResponsive from "@/components/Hooks/useResponsive";
import { usePathname, useRouter } from "next/navigation";
import { PATH_AUTH, PATH_DASHBOARD } from "@/route/paths";
import LoginForm from "./LoginForm";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        display: "flex",
    },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    padding: theme.spacing(3),
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
        alignItems: "flex-start",
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 464,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
    const router = useRouter();
    const smUp = useResponsive("up", "sm");

    const mdUp = useResponsive("up", "md");
    const [logoRotated, setLogoRotated] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        if (!logoRotated) {
            controls.start({
                rotateX: 360,
                transition: { duration: 1, ease: "easeInOut" },
            });
            setLogoRotated(true);
        }
    }, [logoRotated, controls]);
    const keyframesExample = {
        hidden: { opacity: 0, x: -100 },
        halfway: { opacity: 0.5, x: 50 },
        visible: { opacity: 1, x: 0 },
    };
    const formKeyFrames = {
        hidden: { opacity: 0, y: -100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
        },
    };
    const setUser = () => {
        const user = { status: "Active user" };
        localStorage.setItem("user", JSON.stringify(user));
        router.push(PATH_DASHBOARD.dashboard);
        console.log("User set:", user);
    };

    return (
        <RootStyle>
            <HeaderStyle>
                <Stack direction={"row"}>
                    <Box>
                        <motion.div animate={controls}>
                            <CompanyIcon />
                        </motion.div>
                    </Box>

                    {/* <Box>
                            <img
                                src={genieImg}
                                alt="login Img"
                                height={50}
                                width={50}
                            />
                        </Box> */}
                </Stack>

                {smUp && (
                    <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                        Don’t have an account? {""}
                        <Link href="/auth/register" passHref>
                            <Typography
                                component="span"
                                variant="subtitle2"
                                sx={{ cursor: "pointer" }}
                            >
                                Get started
                            </Typography>
                        </Link>
                    </Typography>
                )}
            </HeaderStyle>

            {mdUp && (
                <SectionStyle>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={keyframesExample}
                    >
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Welcome Back
                        </Typography>
                        <Box sx={{ padding: 2 }}>
                            <img
                                style={{ borderRadius: 4 }}
                                src={
                                    "https://www.tomorrow.io/wp-content/uploads/2023/10/weather-forecast.jpg"
                                }
                                alt="login"
                            />
                        </Box>
                    </motion.div>
                </SectionStyle>
            )}

            <Container maxWidth="sm">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={formKeyFrames}
                >
                    <ContentStyle>
                        <Typography variant="h4" gutterBottom>
                            Sign in to Wesite Admin panel
                        </Typography>

                        <Typography sx={{ color: "text.secondary", mb: 5 }}>
                            Enter your details below.
                        </Typography>

                        {/* <AuthSocial /> */}

                        <LoginForm />
                        {/* <Button
                            variant="contained"
                            color="primary"
                            onClick={setUser}
                        >
                            Set User
                        </Button> */}

                        {!smUp && (
                            <Typography
                                variant="body2"
                                align="center"
                                sx={{ mt: 3 }}
                            >
                                Don’t have an account?{" "}
                                <Link href="/auth/register" passHref>
                                    <Typography
                                        component="span"
                                        variant="subtitle2"
                                        sx={{ cursor: "pointer" }}
                                    >
                                        Get started
                                    </Typography>
                                </Link>
                            </Typography>
                        )}
                    </ContentStyle>
                </motion.div>
            </Container>
        </RootStyle>
    );
}
