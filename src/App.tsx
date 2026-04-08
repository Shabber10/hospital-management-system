import { useState, useEffect } from "react";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { Dashboard } from "./components/Dashboard";
import { ProfileSetup } from "./components/ProfileSetup";
import { AppShell } from "./components/AppShell";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "./lib/motion-variants";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import axios from "axios";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainApp() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user') || 'null'));
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('user-login', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user-login', handleStorageChange);
    };
  }, []);

  return (
    <AppShell rightAction={user ? <SignOutButton /> : <div />}>
      <AnimatedBackground />
      <Content user={user} />
      <Toaster />
    </AppShell>
  );
}

function Content({ user }: { user: any }) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user?.email && user?.role?.toLowerCase() === 'patient') {
      axios.get(`http://localhost:5000/api/patient-details/${user.email}`)
        .then(res => setProfile(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </div>
    );
  }

  // Handle case where patient profile is not yet filled
  if (user?.role?.toLowerCase() === 'patient' && profile === null) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileSetup />
      </div>
    );
  }

  // user is logged in
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Dashboard
        user={user}
        patientProfile={user?.role?.toLowerCase() === 'patient' ? (profile || {}) : null}
        doctorProfile={user?.role?.toLowerCase() === 'doctor' ? {} : null}
      />
    </div>
  );
}
