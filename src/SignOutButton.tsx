import { Button } from "./components/ui/button";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { tap } from "@/lib/motion-variants";

export function SignOutButton() {
  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-login"));
  };

  return (
    <motion.div {...tap}>
      <Button
        variant="ghost"
        onClick={handleSignOut}
        className="glass-soft"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign out
      </Button>
    </motion.div>
  );
}
