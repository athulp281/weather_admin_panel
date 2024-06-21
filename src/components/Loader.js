import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Image from "next/image";

function Loader() {
    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Image
                        width={150}
                        height={40}
                        src="https://teaminterval.in/wp-content/uploads/2022/03/interval-logo.png"
                        alt="Interval Logo"
                    />
                    <Box sx={{ width: "100%", marginTop: 1.5 }}>
                        <LinearProgress sx={{ borderRadius: 2 }} />
                    </Box>
                </Box>
                <Box></Box>
            </Box>
        </div>
    );
}

export default Loader;
