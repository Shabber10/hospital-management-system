"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { slideUp, stagger, tap } from "@/lib/motion-variants";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <form
        className="flex flex-col gap-form-field"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          void signIn("password", formData).catch((error) => {
            let toastTitle = "";
            if (error.message.includes("Invalid password")) {
              toastTitle = "Invalid password. Please try again.";
            } else {
              toastTitle =
                flow === "signIn"
                  ? "Could not sign in, did you mean to sign up?"
                  : "Could not sign up, did you mean to sign in?";
            }
            toast.error(toastTitle);
            setSubmitting(false);
          });
        }}
      >
        <motion.div variants={slideUp} className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            className="pl-10"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </motion.div>
        <motion.div variants={slideUp} className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            className="pl-10 pr-10"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </motion.div>
        <motion.div variants={slideUp}>
          <motion.div {...tap}>
            <Button className="w-full" type="submit" disabled={submitting}>
              {flow === "signIn" ? "Sign in" : "Sign up"}
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          variants={slideUp}
          className="text-center text-sm text-muted-foreground"
        >
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-primary hover:text-primary-hover hover:underline font-medium cursor-pointer transition-colors"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </button>
        </motion.div>
      </form>
      <motion.div
        variants={slideUp}
        className="flex items-center justify-center my-6"
      >
        <hr className="my-4 grow border-border" />
        <span className="mx-4 text-muted-foreground text-sm">or</span>
        <hr className="my-4 grow border-border" />
      </motion.div>
      <motion.div variants={slideUp} {...tap}>
        <Button
          variant="glass"
          className="w-full"
          onClick={() => void signIn("anonymous")}
        >
          <User className="h-4 w-4 mr-2" />
          Sign in anonymously
        </Button>
      </motion.div>
    </motion.div>
  );
}
