"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { Button } from "./components/ui/button";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { tap } from "@/lib/motion-variants";

export function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <motion.div {...tap}>
      <Button
        variant="ghost"
        onClick={() => void signOut()}
        className="glass-soft"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign out
      </Button>
    </motion.div>
  );
}
