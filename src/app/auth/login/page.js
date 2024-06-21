import AuthLayout from "@/components/sidebar/authLayout/AuthLayout";
import { Login } from "@/sections/auth/login";
import React from "react";

function page() {
    return (
        <div>
            <AuthLayout>
                <Login />
            </AuthLayout>
        </div>
    );
}

export default page;
