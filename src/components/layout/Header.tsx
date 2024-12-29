"use client";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "lucide-react";
import { AuthButton } from "../auth/AuthButton";
// src/components/layout/Header.tsx
import { UserMenu } from "../auth/UserMenu";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export const Header = () => {
	const { user, loading } = useAuth();

	return (
		<header className="border-b">
			<div className="container mx-auto px-4 py-4">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-2">
						<Navigation className="w-6 h-6" />
						<Link href="/">
							<h1 className="text-xl font-bold">Drive Route Planner</h1>
						</Link>
					</div>
					<div className="flex items-center gap-4">
						{/* <ThemeToggle /> */}
						{!loading && (user ? <UserMenu /> : <AuthButton />)}
					</div>
				</div>
			</div>
		</header>
	);
};
