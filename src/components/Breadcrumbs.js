import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { usePathname, useRouter } from "next/navigation";

function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
}

export default function Breadcrumb() {
    const pathname = usePathname();
    const path = pathname;
    const pathArray = path.split("/").filter((segment) => segment.length > 0);
    console.log(pathname);

    const breadcrumbs = pathArray.map((item) => {
        return (
            <Link
                underline="hover"
                key="1"
                color="inherit"
                href="/"
                onClick={handleClick}
            >
                {item}
            </Link>
        );
    });

    return (
        <Stack spacing={2}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
}
