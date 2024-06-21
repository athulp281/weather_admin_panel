import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { PATH_AUTH } from "@/route/paths";

export default function AccountPopover() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleRemove = () => {
        localStorage.removeItem("user");
        router.push(PATH_AUTH.login);
        console.log("User removed");
    };

    return (
        <div>
            <Box
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <Avatar
                    sx={{
                        bgcolor: open ? "black" : undefined,
                    }}
                    alt="Travis Howard"
                    src="https://www.interactivebrokers.co.in/images/web/hero-microsite-fund-admin.jpg"
                />
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleRemove}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
