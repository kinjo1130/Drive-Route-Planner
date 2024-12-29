"use client";
// src/components/layout/Header.tsx
import { UserMenu } from "../auth/UserMenu";
import { AuthButton } from "../auth/AuthButton";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "lucide-react";

export const Header = () => {
  const { user, loading } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Navigation className="w-6 h-6" />
            <h1 className="text-xl font-bold">Drive Route Planner</h1>
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