import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createAppointment = mutation({
  args: {
    doctorId: v.id("doctors"),
    appointmentDate: v.string(),
    appointmentTime: v.string(),
    symptoms: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const patient = await ctx.db
      .query("patients")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    if (!patient) {
      throw new Error("Patient profile not found. Please create your profile first.");
    }

    // Check if appointment slot is available
    const existingAppointment = await ctx.db
      .query("appointments")
      .filter((q) => 
        q.and(
          q.eq(q.field("doctorId"), args.doctorId),
          q.eq(q.field("appointmentDate"), args.appointmentDate),
          q.eq(q.field("appointmentTime"), args.appointmentTime),
          q.neq(q.field("status"), "CANCELLED")
        )
      )
      .first();

    if (existingAppointment) {
      throw new Error("This appointment slot is already booked");
    }

    return await ctx.db.insert("appointments", {
      patientId: patient._id,
      doctorId: args.doctorId,
      appointmentDate: args.appointmentDate,
      appointmentTime: args.appointmentTime,
      status: "SCHEDULED",
      symptoms: args.symptoms,
      notes: args.notes,
    });
  },
});

export const getPatientAppointments = query({
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

    const appointments = await ctx.db
      .query("appointments")
      .withIndex("by_patient", (q) => q.eq("patientId", patient._id))
      .order("desc")
      .collect();

    // Get doctor details for each appointment
    const appointmentsWithDoctors = await Promise.all(
      appointments.map(async (appointment) => {
        const doctor = await ctx.db.get(appointment.doctorId);
        return {
          ...appointment,
          doctor,
        };
      })
    );

    return appointmentsWithDoctors;
  },
});

export const getDoctorAppointments = query({
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

    const appointments = await ctx.db
      .query("appointments")
      .withIndex("by_doctor", (q) => q.eq("doctorId", doctor._id))
      .order("desc")
      .collect();

    // Get patient details for each appointment
    const appointmentsWithPatients = await Promise.all(
      appointments.map(async (appointment) => {
        const patient = await ctx.db.get(appointment.patientId);
        return {
          ...appointment,
          patient,
        };
      })
    );

    return appointmentsWithPatients;
  },
});

export const updateAppointmentStatus = mutation({
  args: {
    appointmentId: v.id("appointments"),
    status: v.union(
      v.literal("SCHEDULED"),
      v.literal("COMPLETED"),
      v.literal("CANCELLED"),
      v.literal("NO_SHOW")
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const appointment = await ctx.db.get(args.appointmentId);
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    // Check if user is authorized to update this appointment
    const patient = await ctx.db
      .query("patients")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    const doctor = await ctx.db
      .query("doctors")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();

    const isAuthorized = 
      (patient && appointment.patientId === patient._id) ||
      (doctor && appointment.doctorId === doctor._id);

    if (!isAuthorized) {
      throw new Error("Not authorized to update this appointment");
    }

    await ctx.db.patch(args.appointmentId, {
      status: args.status,
    });

    return args.appointmentId;
  },
});

export const getAvailableSlots = query({
  args: {
    doctorId: v.id("doctors"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const doctor = await ctx.db.get(args.doctorId);
    if (!doctor) {
      return [];
    }

    // Get existing appointments for the date
    const existingAppointments = await ctx.db
      .query("appointments")
      .filter((q) => 
        q.and(
          q.eq(q.field("doctorId"), args.doctorId),
          q.eq(q.field("appointmentDate"), args.date),
          q.neq(q.field("status"), "CANCELLED")
        )
      )
      .collect();

    const bookedTimes = existingAppointments.map(apt => apt.appointmentTime);

    // Generate available time slots (9 AM to 5 PM, 30-minute intervals)
    const allSlots = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        if (!bookedTimes.includes(timeString)) {
          allSlots.push(timeString);
        }
      }
    }

    return allSlots;
  },
});

// Add queries to view all sample data
export const getAllAppointments = query({
  args: {},
  handler: async (ctx) => {
    const appointments = await ctx.db.query("appointments").collect();
    
    const appointmentsWithDetails = await Promise.all(
      appointments.map(async (appointment) => {
        const doctor = await ctx.db.get(appointment.doctorId);
        const patient = await ctx.db.get(appointment.patientId);
        return {
          ...appointment,
          doctor,
          patient,
        };
      })
    );

    return appointmentsWithDetails;
  },
});
