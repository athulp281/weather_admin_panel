"use client";
import { Login } from "@/sections/auth/login";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PATH_AUTH, PATH_DASHBOARD } from "@/route/paths";
import Loader from "@/components/Loader";
function AuthLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const user = localStorage.getItem("user");
    const [layout, setLayout] = useState(null);

    useEffect(() => {
        if (user) {
            router.push(PATH_DASHBOARD.dashboard);
            setLayout({ auth: false, dashboard: true });
        } else if (pathname === PATH_AUTH.login) {
            setLayout({ auth: true, dashboard: false });
        } else {
            router.push(PATH_AUTH.login);
            setLayout({ auth: true, dashboard: false });
        }
    }, [user]);
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

    return (
        <div>
            <Box>{children}</Box>
        </div>
    );
}

export default AuthLayout;
