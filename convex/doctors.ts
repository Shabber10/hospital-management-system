import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createDoctorProfile = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Check if doctor profile already exists
    const existingProfile = await ctx.db
      .query("doctors")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (existingProfile) {
      throw new Error("Doctor profile already exists");
    }

    return await ctx.db.insert("doctors", {
      userId,
      ...args,
    });
  },
});

export const getDoctorProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    return await ctx.db
      .query("doctors")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const getAllDoctors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("doctors").collect();
  },
});

export const getDoctorsBySpecialization = query({
  args: { specialization: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("doctors")
      .withIndex("by_specialization", (q) => q.eq("specialization", args.specialization))
      .collect();
  },
});

export const updateDoctorProfile = mutation({
  args: {
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    specialization: v.optional(v.string()),
    licenseNumber: v.optional(v.string()),
    phone: v.optional(v.string()),
    qualification: v.optional(v.string()),
    experienceYears: v.optional(v.number()),
    consultationFee: v.optional(v.number()),
    availableFrom: v.optional(v.string()),
    availableTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const profile = await ctx.db
      .query("doctors")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (!profile) {
      throw new Error("Doctor profile not found");
    }

    const updates = Object.fromEntries(
      Object.entries(args).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(profile._id, updates);
    return profile._id;
  },
});

export const getDoctorPatients = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const doctor = await ctx.db
      .query("doctors")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (!doctor) {
      return [];
    }

    // Get all medical records for this doctor
    const records = await ctx.db
      .query("medicalRecords")
      .withIndex("by_doctor", (q) => q.eq("doctorId", doctor._id))
      .collect();

    // Get unique patient IDs
    const patientIds = [...new Set(records.map(record => record.patientId))];

    // Get patient details
    const patients = await Promise.all(
      patientIds.map(async (patientId) => {
        return await ctx.db.get(patientId);
      })
    );

    return patients.filter(Boolean);
  },
});

// Add queries to view sample data
export const getAllDoctorsWithUsers = query({
  args: {},
  handler: async (ctx) => {
    const doctors = await ctx.db.query("doctors").collect();
    
    const doctorsWithUsers = await Promise.all(
      doctors.map(async (doctor) => {
        const user = await ctx.db.get(doctor.userId);
        return {
          ...doctor,
          user,
        };
      })
    );

    return doctorsWithUsers;
  },
});
