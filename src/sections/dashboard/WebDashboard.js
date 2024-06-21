"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PATH_AUTH } from "@/route/paths";
import Loader from "@/components/Loader";
import { Box } from "@mui/material";

function WebDashboard() {
    const pathname = usePathname();
    const router = useRouter();
    const [layout, setLayout] = useState(null);
    const user = localStorage.getItem("user");
    const data = "tokenActive";
    useEffect(() => {
        if (user) {
            router.push(pathname);
            setLayout({ auth: false, dashboard: true });
        } else {
            router.replace(PATH_AUTH.login);
            setLayout({ auth: true, dashboard: false });
        }
    }, [user, router]);
    if (layout === null) {
        return (
            <Box
                sx={{
                    marginTop: 35,
                }}
            >
                <Loader />
            </Box>
        );
    }
}

export default WebDashboard;
