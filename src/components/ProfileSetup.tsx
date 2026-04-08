import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Stethoscope, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select } from "./ui/select";
import { Button } from "./ui/button";
import { slideUp, stagger, tap, hover } from "../lib/motion-variants";







export function ProfileSetup() {


  const [profileType, setProfileType] = useState<"patient" | "doctor" | null>(null);
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    bloodGroup: "",
    allergies: "",
  });

  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    specialization: "",
    licenseNumber: "",
    phone: "",
    qualification: "",
    experienceYears: "",
    consultationFee: "",
    availableFrom: "",
    availableTo: "",
  });

  const createPatientProfile = useMutation(api.patients.createPatientProfile);
  const createDoctorProfile = useMutation(api.doctors.createDoctorProfile);

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPatientProfile({
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        dateOfBirth: patientData.dateOfBirth || undefined,
        gender: patientData.gender as any || undefined,
        phone: patientData.phone || undefined,
        address: patientData.address || undefined,
        emergencyContact: patientData.emergencyContact || undefined,
        emergencyPhone: patientData.emergencyPhone || undefined,
        bloodGroup: patientData.bloodGroup || undefined,
        allergies: patientData.allergies || undefined,
      });
      toast.success("Patient profile created successfully!");
    } catch (error) {
      toast.error("Failed to create profile: " + (error as Error).message);
    }
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDoctorProfile({
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        specialization: doctorData.specialization,
        licenseNumber: doctorData.licenseNumber,
        phone: doctorData.phone || undefined,
        qualification: doctorData.qualification || undefined,
        experienceYears: doctorData.experienceYears ? parseInt(doctorData.experienceYears) : undefined,
        consultationFee: doctorData.consultationFee ? parseInt(doctorData.consultationFee) : undefined,
        availableFrom: doctorData.availableFrom || undefined,
        availableTo: doctorData.availableTo || undefined,
      });
      toast.success("Doctor profile created successfully!");
    } catch (error) {
      toast.error("Failed to create profile: " + (error as Error).message);
    }
  };

  if (!profileType) {
    return (

      <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #2254af, #06b6d4, #1adcbc, #06d4b2, #24c461)"
      }}
    >
      
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto"
      >
        <motion.div variants={slideUp} className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Complete Your Profile</h2>
          <p className="text-muted-foreground text-lg">Choose your role to get started</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={slideUp} {...hover}>
            <Card className="cursor-pointer h-full" onClick={() => setProfileType("patient")}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-500/20 dark:bg-blue-400/20 rounded-xl flex items-center justify-center">
                    <User className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">I'm a Patient</h3>
                    <p className="text-sm text-muted-foreground">Book appointments and manage my health records</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={slideUp} {...hover}>
            <Card className="cursor-pointer h-full" onClick={() => setProfileType("doctor")}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-500/20 dark:bg-green-400/20 rounded-xl flex items-center justify-center">
                    <Stethoscope className="h-7 w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">I'm a Doctor</h3>
                    <p className="text-sm text-muted-foreground">Manage patients and medical records</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
      </div>
    );
  }

  if (profileType === "patient") {
    return (
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={slideUp} className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Patient Profile Setup</h2>
          <p className="text-muted-foreground">Please provide your information to complete your profile</p>
        </motion.div>

        <Card className="glass">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handlePatientSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={patientData.firstName}
                    onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
                  />
                </motion.div>

                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={patientData.lastName}
                    onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={patientData.dateOfBirth}
                    onChange={(e) => setPatientData({ ...patientData, dateOfBirth: e.target.value })}
                  />
                </motion.div>

                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Gender
                  </label>
                  <Select
                    value={patientData.gender}
                    onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </Select>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={patientData.phone}
                    onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                  />
                </motion.div>

                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Blood Group
                  </label>
                  <Select
                    value={patientData.bloodGroup}
                    onChange={(e) => setPatientData({ ...patientData, bloodGroup: e.target.value })}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Select>
                </motion.div>
              </div>

              <motion.div variants={slideUp}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Address
                </label>
                <Textarea
                  value={patientData.address}
                  onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
                  rows={3}
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Emergency Contact Name
                  </label>
                  <Input
                    type="text"
                    value={patientData.emergencyContact}
                    onChange={(e) => setPatientData({ ...patientData, emergencyContact: e.target.value })}
                  />
                </motion.div>

                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Emergency Contact Phone
                  </label>
                  <Input
                    type="tel"
                    value={patientData.emergencyPhone}
                    onChange={(e) => setPatientData({ ...patientData, emergencyPhone: e.target.value })}
                  />
                </motion.div>
              </div>

              <motion.div variants={slideUp}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Allergies
                </label>
                <Textarea
                  value={patientData.allergies}
                  onChange={(e) => setPatientData({ ...patientData, allergies: e.target.value })}
                  rows={2}
                  placeholder="List any known allergies..."
                />
              </motion.div>

              <motion.div variants={slideUp} className="flex gap-3 pt-4">
                <motion.div {...tap} className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setProfileType(null)}
                    className="w-full"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </motion.div>
                <motion.div {...tap} className="flex-1">
                  <Button type="submit" className="w-full">
                    Create Patient Profile
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (profileType === "doctor") {
    return (
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={slideUp} className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Doctor Profile Setup</h2>
          <p className="text-muted-foreground">Please provide your professional information</p>
        </motion.div>

        <Card className="glass">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleDoctorSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={doctorData.firstName}
                    onChange={(e) => setDoctorData({ ...doctorData, firstName: e.target.value })}
                  />
                </motion.div>

                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={doctorData.lastName}
                    onChange={(e) => setDoctorData({ ...doctorData, lastName: e.target.value })}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Specialization *
                  </label>
                  <Select
                    required
                    value={doctorData.specialization}
                    onChange={(e) => setDoctorData({ ...doctorData, specialization: e.target.value })}
                  >
                    <option value="">Select Specialization</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Psychiatrist">Psychiatrist</option>
                    <option value="ENT Specialist">ENT Specialist</option>
                    <option value="Ophthalmologist">Ophthalmologist</option>
                  </Select>
                </motion.div>

                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    License Number *
                  </label>
                  <Input
                    type="text"
                    required
                    value={doctorData.licenseNumber}
                    onChange={(e) => setDoctorData({ ...doctorData, licenseNumber: e.target.value })}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={doctorData.phone}
                    onChange={(e) => setDoctorData({ ...doctorData, phone: e.target.value })}
                  />
                </motion.div>

                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Experience (Years)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={doctorData.experienceYears}
                    onChange={(e) => setDoctorData({ ...doctorData, experienceYears: e.target.value })}
                  />
                </motion.div>
              </div>

              <motion.div variants={slideUp}>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Qualification
                </label>
                <Input
                  type="text"
                  value={doctorData.qualification}
                  onChange={(e) => setDoctorData({ ...doctorData, qualification: e.target.value })}
                  placeholder="e.g., MBBS, MD"
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Consultation Fee (₹)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={doctorData.consultationFee}
                    onChange={(e) => setDoctorData({ ...doctorData, consultationFee: e.target.value })}
                  />
                </motion.div>

                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Available From
                  </label>
                  <Input
                    type="time"
                    value={doctorData.availableFrom}
                    onChange={(e) => setDoctorData({ ...doctorData, availableFrom: e.target.value })}
                  />
                </motion.div>

                <motion.div variants={slideUp}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Available To
                  </label>
                  <Input
                    type="time"
                    value={doctorData.availableTo}
                    onChange={(e) => setDoctorData({ ...doctorData, availableTo: e.target.value })}
                  />
                </motion.div>
              </div>

              <motion.div variants={slideUp} className="flex gap-3 pt-4">
                <motion.div {...tap} className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setProfileType(null)}
                    className="w-full"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </motion.div>
                <motion.div {...tap} className="flex-1">
                  <Button type="submit" variant="default" className="w-full bg-green-600 hover:bg-green-700">
                    Create Doctor Profile
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return null;
}
