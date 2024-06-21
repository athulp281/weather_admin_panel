import { SnackbarProvider } from "notistack";

export const SnackBarProvider = ({ children }) => {
    return (
        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
            {children}
        </SnackbarProvider>
    );
};
