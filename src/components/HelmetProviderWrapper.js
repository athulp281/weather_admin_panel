// src/components/ThemeProviderWrapper.js
"use client"; // Ensure this file is treated as a client component

import * as React from "react";
import { HelmetProvider } from "react-helmet-async";

export default function HelmetProviderWrapper({ children }) {
    return <HelmetProvider> {children}</HelmetProvider>;
}
