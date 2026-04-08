import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  // Patient profiles
  patients: defineTable({
    userId: v.id("users"),
    firstName: v.string(),
    lastName: v.string(),
    dateOfBirth: v.optional(v.string()),
    gender: v.optional(v.union(v.literal("MALE"), v.literal("FEMALE"), v.literal("OTHER"))),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    emergencyContact: v.optional(v.string()),
    emergencyPhone: v.optional(v.string()),
    bloodGroup: v.optional(v.string()),
    allergies: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),

  // Doctor profiles
  doctors: defineTable({
    userId: v.id("users"),
    firstName: v.string(),
    lastName: v.string(),
    specialization: v.string(),
    licenseNumber: v.string(),
    phone: v.optional(v.string()),
    qualification: v.optional(v.string()),
    experienceYears: v.optional(v.number()),
    consultationFee: v.optional(v.number()),
    availableFrom: v.optional(v.string()),
    availableTo: v.optional(v.string()),
  }).index("by_user_id", ["userId"])
    .index("by_specialization", ["specialization"]),

  // Medical records
  medicalRecords: defineTable({
    patientId: v.id("patients"),
    doctorId: v.id("doctors"),
    visitDate: v.number(),
    symptoms: v.optional(v.string()),
    diagnosis: v.optional(v.string()),
    treatment: v.optional(v.string()),
    notes: v.optional(v.string()),
    followUpDate: v.optional(v.string()),
  }).index("by_patient", ["patientId"])
    .index("by_doctor", ["doctorId"])
    .index("by_visit_date", ["visitDate"]),

  // Prescriptions
  prescriptions: defineTable({
    medicalRecordId: v.id("medicalRecords"),
    patientId: v.id("patients"),
    doctorId: v.id("doctors"),
    medicationName: v.string(),
    dosage: v.string(),
    frequency: v.string(),
    duration: v.string(),
    instructions: v.optional(v.string()),
    prescribedDate: v.number(),
  }).index("by_patient", ["patientId"])
    .index("by_doctor", ["doctorId"])
    .index("by_medical_record", ["medicalRecordId"]),

  // Appointments
  appointments: defineTable({
    patientId: v.id("patients"),
    doctorId: v.id("doctors"),
    appointmentDate: v.string(),
    appointmentTime: v.string(),
    status: v.union(
      v.literal("SCHEDULED"),
      v.literal("COMPLETED"),
      v.literal("CANCELLED"),
      v.literal("NO_SHOW")
    ),
    symptoms: v.optional(v.string()),
    notes: v.optional(v.string()),
  }).index("by_patient", ["patientId"])
    .index("by_doctor", ["doctorId"])
    .index("by_date", ["appointmentDate"])
    .index("by_status", ["status"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
