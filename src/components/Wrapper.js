"use client";
import React, { useEffect, useState } from "react";
import Page from "./page";
import { motion } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { PATH_AUTH } from "@/route/paths";
import Breadcrumbs from "./Breadcrumbs";

const Title = ({ title }) => {
    function capitalizeFirstLetter(string) {
        if (typeof string !== "string") {
            return ""; // or handle the error appropriately
        }
        return string.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    const formattedTitle = capitalizeFirstLetter(title);
    return <Typography variant="h4">{formattedTitle}</Typography>;
};

const Wrapper = ({ title, children }) => {
    const keyframesExample = {
        hidden: { opacity: 0, x: -100 },
        halfway: { opacity: 0.5, x: 50 },
        visible: { opacity: 1, x: 0 },
    };

    const pathname = usePathname();
    const router = useRouter();
    const user = localStorage.getItem("user");
    const [layout, setLayout] = useState(null);

    useEffect(() => {
        if (user) {
            router.push(pathname);
            setLayout({ auth: false, dashboard: true });
        } else {
            router.replace(PATH_AUTH.login);
            setLayout({ auth: true, dashboard: false });
        }
    }, [user, router]);

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={keyframesExample}
                style={{ width: "100%" }}
            >
                <Box padding={5}>
                    <Box width="100%">
                        <Title title={title} />
                    </Box>
                    <Box width="100%">
                        <Breadcrumbs />
                    </Box>
                </Box>

                <Box padding={3}>
                    <Page title={title} sx={{ width: "100%" }}>
                        {children}
                    </Page>
                </Box>
            </motion.div>
        </Box>
    );
};

export default Wrapper;
