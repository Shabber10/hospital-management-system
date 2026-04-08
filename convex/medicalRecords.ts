import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createMedicalRecord = mutation({
  args: {
    patientId: v.id("patients"),
    symptoms: v.optional(v.string()),
    diagnosis: v.optional(v.string()),
    treatment: v.optional(v.string()),
    notes: v.optional(v.string()),
    followUpDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const doctor = await ctx.db
      .query("doctors")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (!doctor) {
      throw new Error("Doctor profile not found");
    }

    return await ctx.db.insert("medicalRecords", {
      patientId: args.patientId,
      doctorId: doctor._id,
      visitDate: Date.now(),
      symptoms: args.symptoms,
      diagnosis: args.diagnosis,
      treatment: args.treatment,
      notes: args.notes,
      followUpDate: args.followUpDate,
    });
  },
});

export const createPrescription = mutation({
  args: {
    medicalRecordId: v.id("medicalRecords"),
    medicationName: v.string(),
    dosage: v.string(),
    frequency: v.string(),
    duration: v.string(),
    instructions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const doctor = await ctx.db
      .query("doctors")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (!doctor) {
      throw new Error("Doctor profile not found");
    }

    const medicalRecord = await ctx.db.get(args.medicalRecordId);
    if (!medicalRecord) {
      throw new Error("Medical record not found");
    }

    if (medicalRecord.doctorId !== doctor._id) {
      throw new Error("Not authorized to create prescription for this record");
    }

    return await ctx.db.insert("prescriptions", {
      medicalRecordId: args.medicalRecordId,
      patientId: medicalRecord.patientId,
      doctorId: doctor._id,
      medicationName: args.medicationName,
      dosage: args.dosage,
      frequency: args.frequency,
      duration: args.duration,
      instructions: args.instructions,
      prescribedDate: Date.now(),
    });
  },
});

export const getMedicalRecordsByPatient = query({
  args: { patientId: v.id("patients") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const records = await ctx.db
      .query("medicalRecords")
      .withIndex("by_patient", (q) => q.eq("patientId", args.patientId))
      .order("desc")
      .collect();

    const recordsWithDoctors = await Promise.all(
      records.map(async (record) => {
        const doctor = await ctx.db.get(record.doctorId);
        const prescriptions = await ctx.db
          .query("prescriptions")
          .withIndex("by_medical_record", (q) => q.eq("medicalRecordId", record._id))
          .collect();
        
        return {
          ...record,
          doctor,
          prescriptions,
        };
      })
    );

    return recordsWithDoctors;
  },
});

export const getDoctorMedicalRecords = query({
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

    const records = await ctx.db
      .query("medicalRecords")
      .withIndex("by_doctor", (q) => q.eq("doctorId", doctor._id))
      .order("desc")
      .collect();

    const recordsWithPatients = await Promise.all(
      records.map(async (record) => {
        const patient = await ctx.db.get(record.patientId);
        const prescriptions = await ctx.db
          .query("prescriptions")
          .withIndex("by_medical_record", (q) => q.eq("medicalRecordId", record._id))
          .collect();
        
        return {
          ...record,
          patient,
          prescriptions,
        };
      })
    );

    return recordsWithPatients;
  },
});

// Add queries to view all sample data
export const getAllMedicalRecords = query({
  args: {},
  handler: async (ctx) => {
    const records = await ctx.db.query("medicalRecords").collect();
    
    const recordsWithDetails = await Promise.all(
      records.map(async (record) => {
        const doctor = await ctx.db.get(record.doctorId);
        const patient = await ctx.db.get(record.patientId);
        const prescriptions = await ctx.db
          .query("prescriptions")
          .withIndex("by_medical_record", (q) => q.eq("medicalRecordId", record._id))
          .collect();
        
        return {
          ...record,
          doctor,
          patient,
          prescriptions,
        };
      })
    );

    return recordsWithDetails;
  },
});
