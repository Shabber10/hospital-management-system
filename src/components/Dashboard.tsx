import { DoctorDashboard } from "./DoctorDashboard";
import { PatientDashboard } from "./PatientDashboard";
import { AdminDashboard } from "./AdminDashboard";
import { motion } from "framer-motion";
import { slideUp, fadeIn } from "../lib/motion-variants";

interface DashboardProps {
  user: any;
  patientProfile: any;
  doctorProfile: any;
}

export function Dashboard({ user, patientProfile, doctorProfile }: DashboardProps) {
  const isAdmin = user?.email === "admin@careweave.com" || user?.role === "admin";

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="show">
      {/* Welcome Header */}
      <motion.div variants={slideUp} className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.name || user?.email?.split("@")[0] || "User"}!
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          {isAdmin
            ? "Managing the CareWeave platform as Administrator"
            : doctorProfile
            ? `Managing your practice as Dr. ${doctorProfile.firstName} ${doctorProfile.lastName}`
            : patientProfile
            ? `Your health dashboard as ${patientProfile.firstName} ${patientProfile.lastName}`
            : "Your healthcare dashboard"}
        </p>
      </motion.div>

      {/* Render appropriate dashboard */}
      {isAdmin ? (
        <AdminDashboard />
      ) : doctorProfile ? (
        <DoctorDashboard profile={doctorProfile} />
      ) : patientProfile ? (
        <PatientDashboard profile={patientProfile} />
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      )}
    </motion.div>
  );
}
