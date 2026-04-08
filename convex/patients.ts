import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createPatientProfile = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if patient profile already exists
    const existingProfile = await ctx.db
      .query("patients")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (existingProfile) {
      throw new Error("Patient profile already exists");
    }

    return await ctx.db.insert("patients", {
      userId,
      ...args,
    });
  },
});

export const getPatientProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    return await ctx.db
      .query("patients")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const updatePatientProfile = mutation({
  args: {
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    gender: v.optional(v.union(v.literal("MALE"), v.literal("FEMALE"), v.literal("OTHER"))),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    emergencyContact: v.optional(v.string()),
    emergencyPhone: v.optional(v.string()),
    bloodGroup: v.optional(v.string()),
    allergies: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const profile = await ctx.db
      .query("patients")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) {
      throw new Error("Patient profile not found");
    }

    const updates = Object.fromEntries(
      Object.entries(args).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(profile._id, updates);
    return profile._id;
  },
});

export const getPatientMedicalRecords = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const patient = await ctx.db
      .query("patients")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (!patient) {
      return [];
    }

    const records = await ctx.db
      .query("medicalRecords")
      .withIndex("by_patient", (q) => q.eq("patientId", patient._id))
      .order("desc")
      .collect();

    // Get doctor details for each record
    const recordsWithDoctors = await Promise.all(
      records.map(async (record) => {
        const doctor = await ctx.db.get(record.doctorId);
        return {
          ...record,
          doctor,
        };
      })
    );

    return recordsWithDoctors;
  },
});

export const getPatientPrescriptions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const patient = await ctx.db
      .query("patients")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (!patient) {
      return [];
    }

    const prescriptions = await ctx.db
      .query("prescriptions")
      .withIndex("by_patient", (q) => q.eq("patientId", patient._id))
      .order("desc")
      .collect();

    // Get doctor details for each prescription
    const prescriptionsWithDoctors = await Promise.all(
      prescriptions.map(async (prescription) => {
        const doctor = await ctx.db.get(prescription.doctorId);
        return {
          ...prescription,
          doctor,
        };
      })
    );

    return prescriptionsWithDoctors;
  },
});

// Add queries to view sample data
export const getAllPatients = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("patients").collect();
  },
});

export const getAllPatientsWithUsers = query({
  args: {},
  handler: async (ctx) => {
    const patients = await ctx.db.query("patients").collect();
    
    const patientsWithUsers = await Promise.all(
      patients.map(async (patient) => {
        const user = await ctx.db.get(patient.userId);
        return {
          ...patient,
          user,
        };
      })
    );

    return patientsWithUsers;
  },
});
