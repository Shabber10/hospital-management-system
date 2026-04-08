import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { Dashboard } from "./components/Dashboard";
import { ProfileSetup } from "./components/ProfileSetup";
import { AppShell } from "./components/AppShell";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "./lib/motion-variants";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* OTP-based Forgot Password page (standalone, no AppShell) */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Main app (all other routes) */}
        <Route path="*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainApp() {
  return (
    <AppShell rightAction={<Authenticated><SignOutButton /></Authenticated>}>
      <AnimatedBackground />
      <Content />
      <Toaster />
    </AppShell>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const patientProfile = useQuery(api.patients.getPatientProfile);
  const doctorProfile = useQuery(api.doctors.getDoctorProfile);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* ===================== UNAUTHENTICATED VIEW ===================== */}
      <Unauthenticated>
        <div
          className="min-h-screen w-full flex items-center justify-center p-6 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, #2254af, #06b6d4, #1adcbc, #06d4b2, #24c461)",
          }}
        >
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate="show"
            className="max-w-md w-full"
          >
            <motion.div variants={fadeIn} className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4 drop-shadow">
                CareWeave IQ
              </h1>
              <p className="text-xl text-white/90">
                Smart Healthcare Management System
              </p>
              <p className="text-white/80 mt-2">
                Sign in to access your healthcare dashboard
              </p>
            </motion.div>

            <motion.div
              variants={slideUp}
              className="backdrop-blur-md bg-white/10 shadow-xl rounded-2xl p-6 sm:p-8"
            >
              <SignInForm />
              <p className="mt-4 text-center text-sm text-white/70">
                <Link
                  to="/forgot-password"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Forgot your password?
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Unauthenticated>

      {/* ===================== AUTHENTICATED VIEW ===================== */}
      <Authenticated>
        {!patientProfile && !doctorProfile ? (
          <ProfileSetup />
        ) : (
          <Dashboard
            user={loggedInUser}
            patientProfile={patientProfile}
            doctorProfile={doctorProfile}
          />
        )}
      </Authenticated>
    </div>
  );
}
