"use client";
import * as React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CustomGridToolbar from "@/components/CustomGridToolbar";
import { COURSE_TABLE_HEAD } from "./CourseTableHead";
import { CourseDemo } from "./DemoData";

function Course() {
    const [gridSize, setGridSize] = useState(5);

    return (
        <>
            <Paper elevation={3}>
                <DataGrid
                    components={{ Toolbar: CustomGridToolbar }}
                    autoHeight
                    sx={{
                        "& .MuiDataGrid-columnHeaderTitle": {
                            textOverflow: "clip",
                            whiteSpace: "break-spaces",
                            lineHeight: 1,
                        },
                    }}
                    rows={CourseDemo}
                    columns={COURSE_TABLE_HEAD}
                    getRowId={(row) => row.slNo}
                    pageSize={gridSize}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    onPageSizeChange={(newGridSize) => setGridSize(newGridSize)}
                />
            </Paper>
        </>
    );
}

export default Course;

// "use client";
// import React from "react";
// import { DataGrid } from "@mui/x-data-grid";

// const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     { field: "firstName", headerName: "First Name", width: 150 },
//     { field: "lastName", headerName: "Last Name", width: 150 },
//     { field: "age", headerName: "Age", type: "number", width: 110 },
//     { field: "email", headerName: "Email", width: 200 },
// ];

// const rows = [
//     {
//         id: 1,
//         lastName: "Snow",
//         firstName: "Jon",
//         age: 35,
//         email: "jon@example.com",
//     },
//     {
//         id: 2,
//         lastName: "Lannister",
//         firstName: "Cersei",
//         age: 42,
//         email: "cersei@example.com",
//     },
//     {
//         id: 3,
//         lastName: "Lannister",
//         firstName: "Jaime",
//         age: 45,
//         email: "jaime@example.com",
//     },
//     {
//         id: 4,
//         lastName: "Stark",
//         firstName: "Arya",
//         age: 16,
//         email: "arya@example.com",
//     },
//     {
//         id: 5,
//         lastName: "Targaryen",
//         firstName: "Daenerys",
//         age: null,
//         email: "daenerys@example.com",
//     },
//     {
//         id: 6,
//         lastName: "Melisandre",
//         firstName: null,
//         age: 150,
//         email: "melisandre@example.com",
//     },
//     {
//         id: 7,
//         lastName: "Clifford",
//         firstName: "Ferrara",
//         age: 44,
//         email: "ferrara@example.com",
//     },
//     {
//         id: 8,
//         lastName: "Frances",
//         firstName: "Rossini",
//         age: 36,
//         email: "rossini@example.com",
//     },
//     {
//         id: 9,
//         lastName: "Roxie",
//         firstName: "Harvey",
//         age: 65,
//         email: "roxie@example.com",
//     },
// ];

// const MyDataGrid = () => {
//     return (
//         <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
//             <div style={{ height: "80vh", width: "100%", maxWidth: "100%" }}>
//                 <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5, 10, 20]}
//                     checkboxSelection
//                 />
//             </div>
//         </div>
//     );
// };

// export default MyDataGrid;
