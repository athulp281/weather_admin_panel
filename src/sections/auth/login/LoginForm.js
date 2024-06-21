import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
    Link,
    Stack,
    Checkbox,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Button,
} from "@mui/material";
// component
import typography from "@/context/ThemeContext/typography";
import * as Yup from "yup";
import Iconify from "@/components/Iconify";
import { usePathname, useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/route/paths";
import { login } from "@/redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// ----------------------------------------------------------------------

export default function LoginForm() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.login);
    const pathname = usePathname();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: email,
            password: password,
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            dispatch(login(values)).then((res) => {
                if (res.payload.error) {
                    enqueueSnackbar(res.payload.error, { variant: "error" });
                } else if (res.payload.user) {
                    enqueueSnackbar(res.payload.message, {
                        variant: "success",
                    });
                    const user = { status: "Active user" };
                    localStorage.setItem("user", JSON.stringify(res.payload));
                    router.push(PATH_DASHBOARD.dashboard);
                }
            });
        },
    });

    const {
        errors,
        touched,
        values,
        isSubmitting,
        handleSubmit,
        getFieldProps,
    } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email address"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        {...getFieldProps("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleShowPassword}
                                        edge="end"
                                    >
                                        <Iconify
                                            icon={
                                                showPassword
                                                    ? "eva:eye-fill"
                                                    : "eva:eye-off-fill"
                                            }
                                        />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ my: 2 }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...getFieldProps("remember")}
                                checked={values.remember}
                            />
                        }
                        label="Remember me"
                    />

                    {/* <Link
                        component={RouterLink}
                        variant="subtitle2"
                        to="/auth/forgott"
                        underline="hover"
                    >
                        Forgot password?
                    </Link> */}
                </Stack>

                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    // disabled={loading ? true : false}
                    style={typography.button}
                >
                    Login
                </Button>
            </Form>
        </FormikProvider>
    );
}
