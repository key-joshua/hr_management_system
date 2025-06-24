"use client";

import { CircularProgress } from "@mui/material";

export interface LoaderProps { isLoading: boolean }

export function ButtonLoader({color = "white"}: { color?: string }) {
	return (<CircularProgress size={20} sx={{ color }} />);
}