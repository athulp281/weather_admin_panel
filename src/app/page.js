"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PATH_AUTH } from "@/route/paths";
import Loader from "@/components/Loader";
import { Box } from "@mui/material";

function Home() {
    const pathname = usePathname();
    const router = useRouter();
    const [layout, setLayout] = useState(null);
    const data = "tokenActive";
    const user = localStorage.getItem("user");
    useEffect(() => {
        if (user) {
            router.push(pathname);
            setLayout({ auth: false, dashboard: true });
        } else {
            setTimeout(() => {
                router.replace(PATH_AUTH.login);
                setLayout({ auth: true, dashboard: false });
            }, 7000);
        }
    }, [data, router]);
    if (layout === null) {
        // Return a loading state or nothing while determining the layout
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

export default Home;
