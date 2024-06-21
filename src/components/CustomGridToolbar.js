import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
export default function CustomGridToolbar() {
    return (
        <Box sx={{ backgroundColor: "grey.200" }}>
            <GridToolbarContainer
                sx={{ display: "flex", justifyContent: "space-between", p: 1 }}
            >
                <Box>
                    <GridToolbarColumnsButton />
                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </Box>
                <Box>
                    <GridToolbarQuickFilter
                        className="grid-search"
                        sx={{
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "grey.300",
                            borderRadius: "8px",
                            px: "12px",
                            py: "8px",
                        }}
                    />
                </Box>
            </GridToolbarContainer>
        </Box>
    );
}
