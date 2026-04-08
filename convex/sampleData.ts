import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertSampleData = mutation({
  args: {},
  handler: async (ctx) => {
    // First, create user accounts for doctors and patients
    const doctorUsers = [
      {
        name: "Dr. Rajesh Kumar",
        email: "rajesh.kumar@careweave.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Dr. Priya Sharma",
        email: "priya.sharma@careweave.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Dr. Amit Patel",
        email: "amit.patel@careweave.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Dr. Sunita Reddy",
        email: "sunita.reddy@careweave.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Dr. Vikram Singh",
        email: "vikram.singh@careweave.com",
        emailVerificationTime: Date.now(),
      },
    ];

    const patientUsers = [
      {
        name: "Rahul Sharma",
        email: "rahul.sharma@gmail.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Anita Gupta",
        email: "anita.gupta@gmail.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Suresh Mehta",
        email: "suresh.mehta@gmail.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Kavya Nair",
        email: "kavya.nair@gmail.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Arjun Verma",
        email: "arjun.verma@gmail.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Deepika Joshi",
        email: "deepika.joshi@gmail.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Manish Agarwal",
        email: "manish.agarwal@gmail.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Pooja Bansal",
        email: "pooja.bansal@gmail.com",
        emailVerificationTime: Date.now(),
      },
    ];

    // Insert doctor users
    const doctorUserIds = [];
    for (const user of doctorUsers) {
      const userId = await ctx.db.insert("users", user);
      doctorUserIds.push(userId);
    }

    // Insert patient users
    const patientUserIds = [];
    for (const user of patientUsers) {
      const userId = await ctx.db.insert("users", user);
      patientUserIds.push(userId);
    }

    // Create doctor profiles
    const doctors = [
      {
        userId: doctorUserIds[0],
        firstName: "Rajesh",
        lastName: "Kumar",
        specialization: "Cardiologist",
        licenseNumber: "MH/2018/12345",
        phone: "+91-9876543210",
        qualification: "MBBS, MD (Cardiology)",
        experienceYears: 12,
        consultationFee: 800,
        availableFrom: "09:00",
        availableTo: "17:00",
      },
      {
        userId: doctorUserIds[1],
        firstName: "Priya",
        lastName: "Sharma",
        specialization: "Neurologist",
        licenseNumber: "DL/2019/67890",
        phone: "+91-9876543211",
        qualification: "MBBS, MD (Neurology)",
        experienceYears: 8,
        consultationFee: 1000,
        availableFrom: "10:00",
        availableTo: "18:00",
      },
      {
        userId: doctorUserIds[2],
        firstName: "Amit",
        lastName: "Patel",
        specialization: "Orthopedic",
        licenseNumber: "GJ/2020/11111",
        phone: "+91-9876543212",
        qualification: "MBBS, MS (Orthopedics)",
        experienceYears: 15,
        consultationFee: 700,
        availableFrom: "08:00",
        availableTo: "16:00",
      },
      {
        userId: doctorUserIds[3],
        firstName: "Sunita",
        lastName: "Reddy",
        specialization: "Dermatologist",
        licenseNumber: "AP/2021/22222",
        phone: "+91-9876543213",
        qualification: "MBBS, MD (Dermatology)",
        experienceYears: 6,
        consultationFee: 600,
        availableFrom: "11:00",
        availableTo: "19:00",
      },
      {
        userId: doctorUserIds[4],
        firstName: "Vikram",
        lastName: "Singh",
        specialization: "General Physician",
        licenseNumber: "UP/2017/33333",
        phone: "+91-9876543214",
        qualification: "MBBS, MD (Internal Medicine)",
        experienceYears: 10,
        consultationFee: 500,
        availableFrom: "09:00",
        availableTo: "17:00",
      },
    ];

    const doctorIds = [];
    for (const doctor of doctors) {
      const doctorId = await ctx.db.insert("doctors", doctor);
      doctorIds.push(doctorId);
    }

    // Create patient profiles
    const patients = [
      {
        userId: patientUserIds[0],
        firstName: "Rahul",
        lastName: "Sharma",
        dateOfBirth: "1985-03-15",
        gender: "MALE" as const,
        phone: "+91-8765432109",
        address: "A-204, Sunrise Apartments, Andheri West, Mumbai - 400058",
        emergencyContact: "Sunita Sharma",
        emergencyPhone: "+91-8765432108",
        bloodGroup: "B+",
        allergies: "Penicillin, Dust",
      },
      {
        userId: patientUserIds[1],
        firstName: "Anita",
        lastName: "Gupta",
        dateOfBirth: "1990-07-22",
        gender: "FEMALE" as const,
        phone: "+91-8765432110",
        address: "B-15, Green Valley Society, Sector 18, Noida - 201301",
        emergencyContact: "Rajesh Gupta",
        emergencyPhone: "+91-8765432111",
        bloodGroup: "A+",
        allergies: "Shellfish",
      },
      {
        userId: patientUserIds[2],
        firstName: "Suresh",
        lastName: "Mehta",
        dateOfBirth: "1975-11-08",
        gender: "MALE" as const,
        phone: "+91-8765432112",
        address: "C-301, Royal Heights, Bandra East, Mumbai - 400051",
        emergencyContact: "Meera Mehta",
        emergencyPhone: "+91-8765432113",
        bloodGroup: "O+",
        allergies: "None",
      },
      {
        userId: patientUserIds[3],
        firstName: "Kavya",
        lastName: "Nair",
        dateOfBirth: "1992-05-14",
        gender: "FEMALE" as const,
        phone: "+91-8765432114",
        address: "D-12, Lotus Residency, Koramangala, Bangalore - 560034",
        emergencyContact: "Arun Nair",
        emergencyPhone: "+91-8765432115",
        bloodGroup: "AB+",
        allergies: "Latex",
      },
      {
        userId: patientUserIds[4],
        firstName: "Arjun",
        lastName: "Verma",
        dateOfBirth: "1988-09-30",
        gender: "MALE" as const,
        phone: "+91-8765432116",
        address: "E-45, Paradise Colony, Jubilee Hills, Hyderabad - 500033",
        emergencyContact: "Priya Verma",
        emergencyPhone: "+91-8765432117",
        bloodGroup: "A-",
        allergies: "Peanuts",
      },
      {
        userId: patientUserIds[5],
        firstName: "Deepika",
        lastName: "Joshi",
        dateOfBirth: "1995-12-03",
        gender: "FEMALE" as const,
        phone: "+91-8765432118",
        address: "F-78, Silver Oak Apartments, Vastrapur, Ahmedabad - 380015",
        emergencyContact: "Vikash Joshi",
        emergencyPhone: "+91-8765432119",
        bloodGroup: "B-",
        allergies: "Sulfa drugs",
      },
      {
        userId: patientUserIds[6],
        firstName: "Manish",
        lastName: "Agarwal",
        dateOfBirth: "1982-01-25",
        gender: "MALE" as const,
        phone: "+91-8765432120",
        address: "G-23, Golden Heights, Civil Lines, Delhi - 110054",
        emergencyContact: "Neha Agarwal",
        emergencyPhone: "+91-8765432121",
        bloodGroup: "O-",
        allergies: "Aspirin",
      },
      {
        userId: patientUserIds[7],
        firstName: "Pooja",
        lastName: "Bansal",
        dateOfBirth: "1987-06-18",
        gender: "FEMALE" as const,
        phone: "+91-8765432122",
        address: "H-56, Rose Garden Society, Malviya Nagar, Jaipur - 302017",
        emergencyContact: "Rohit Bansal",
        emergencyPhone: "+91-8765432123",
        bloodGroup: "AB-",
        allergies: "Iodine",
      },
    ];

    const patientIds = [];
    for (const patient of patients) {
      const patientId = await ctx.db.insert("patients", patient);
      patientIds.push(patientId);
    }

    // Create appointments
    const appointments = [
      {
        patientId: patientIds[0],
        doctorId: doctorIds[0], // Cardiologist
        appointmentDate: "2024-01-15",
        appointmentTime: "10:00",
        status: "COMPLETED" as const,
        symptoms: "Chest pain, shortness of breath",
        notes: "Regular checkup for hypertension",
      },
      {
        patientId: patientIds[1],
        doctorId: doctorIds[3], // Dermatologist
        appointmentDate: "2024-01-16",
        appointmentTime: "14:00",
        status: "COMPLETED" as const,
        symptoms: "Skin rash, itching",
        notes: "Allergic reaction treatment",
      },
      {
        patientId: patientIds[2],
        doctorId: doctorIds[4], // General Physician
        appointmentDate: "2024-01-17",
        appointmentTime: "11:00",
        status: "COMPLETED" as const,
        symptoms: "Fever, body ache, headache",
        notes: "Suspected viral infection",
      },
      {
        patientId: patientIds[3],
        doctorId: doctorIds[1], // Neurologist
        appointmentDate: "2024-01-18",
        appointmentTime: "15:30",
        status: "COMPLETED" as const,
        symptoms: "Severe headaches, dizziness",
        notes: "Migraine consultation",
      },
      {
        patientId: patientIds[4],
        doctorId: doctorIds[2], // Orthopedic
        appointmentDate: "2024-01-19",
        appointmentTime: "09:30",
        status: "COMPLETED" as const,
        symptoms: "Lower back pain, stiffness",
        notes: "Work-related back injury",
      },
      {
        patientId: patientIds[5],
        doctorId: doctorIds[4], // General Physician
        appointmentDate: "2024-01-20",
        appointmentTime: "12:00",
        status: "COMPLETED" as const,
        symptoms: "Persistent cough, throat pain",
        notes: "Upper respiratory infection",
      },
      {
        patientId: patientIds[6],
        doctorId: doctorIds[0], // Cardiologist
        appointmentDate: "2024-01-22",
        appointmentTime: "16:00",
        status: "COMPLETED" as const,
        symptoms: "High blood pressure, fatigue",
        notes: "Hypertension management",
      },
      {
        patientId: patientIds[7],
        doctorId: doctorIds[3], // Dermatologist
        appointmentDate: "2024-01-23",
        appointmentTime: "13:30",
        status: "COMPLETED" as const,
        symptoms: "Acne, oily skin",
        notes: "Skin care consultation",
      },
      {
        patientId: patientIds[0],
        doctorId: doctorIds[4], // General Physician
        appointmentDate: "2024-01-25",
        appointmentTime: "10:30",
        status: "SCHEDULED" as const,
        symptoms: "Diabetes follow-up",
        notes: "Regular diabetes checkup",
      },
      {
        patientId: patientIds[2],
        doctorId: doctorIds[2], // Orthopedic
        appointmentDate: "2024-01-26",
        appointmentTime: "14:30",
        status: "SCHEDULED" as const,
        symptoms: "Knee pain, swelling",
        notes: "Joint pain consultation",
      },
    ];

    const appointmentIds = [];
    for (const appointment of appointments) {
      const appointmentId = await ctx.db.insert("appointments", appointment);
      appointmentIds.push(appointmentId);
    }

    // Create medical records
    const medicalRecords = [
      {
        patientId: patientIds[0],
        doctorId: doctorIds[0],
        visitDate: new Date("2024-01-15").getTime(),
        symptoms: "Chest pain, shortness of breath, fatigue",
        diagnosis: "Hypertension Stage 2",
        treatment: "Lifestyle modifications, antihypertensive medication",
        notes: "Patient advised to reduce salt intake, regular exercise. Blood pressure: 160/100 mmHg",
        followUpDate: "2024-02-15",
      },
      {
        patientId: patientIds[1],
        doctorId: doctorIds[3],
        visitDate: new Date("2024-01-16").getTime(),
        symptoms: "Red, itchy rash on arms and face",
        diagnosis: "Contact Dermatitis",
        treatment: "Topical corticosteroids, antihistamines",
        notes: "Allergic reaction to new detergent. Avoid contact with allergens.",
        followUpDate: "2024-01-30",
      },
      {
        patientId: patientIds[2],
        doctorId: doctorIds[4],
        visitDate: new Date("2024-01-17").getTime(),
        symptoms: "High fever (102°F), body ache, headache, nausea",
        diagnosis: "Viral Fever",
        treatment: "Paracetamol, rest, fluid intake",
        notes: "Viral infection. Complete rest for 3-4 days. Fever subsiding.",
        followUpDate: "2024-01-24",
      },
      {
        patientId: patientIds[3],
        doctorId: doctorIds[1],
        visitDate: new Date("2024-01-18").getTime(),
        symptoms: "Severe headaches, sensitivity to light, nausea",
        diagnosis: "Migraine with Aura",
        treatment: "Sumatriptan, lifestyle modifications",
        notes: "Stress-induced migraines. Advised stress management techniques.",
        followUpDate: "2024-02-18",
      },
      {
        patientId: patientIds[4],
        doctorId: doctorIds[2],
        visitDate: new Date("2024-01-19").getTime(),
        symptoms: "Lower back pain, muscle stiffness, difficulty bending",
        diagnosis: "Lumbar Strain",
        treatment: "NSAIDs, physiotherapy, rest",
        notes: "Work-related injury. Advised ergonomic workplace setup.",
        followUpDate: "2024-02-02",
      },
      {
        patientId: patientIds[5],
        doctorId: doctorIds[4],
        visitDate: new Date("2024-01-20").getTime(),
        symptoms: "Persistent dry cough, sore throat, mild fever",
        diagnosis: "Upper Respiratory Tract Infection",
        treatment: "Cough syrup, throat lozenges, steam inhalation",
        notes: "Viral URTI. Symptoms improving with treatment.",
        followUpDate: "2024-01-27",
      },
      {
        patientId: patientIds[6],
        doctorId: doctorIds[0],
        visitDate: new Date("2024-01-22").getTime(),
        symptoms: "Elevated blood pressure, fatigue, occasional dizziness",
        diagnosis: "Essential Hypertension",
        treatment: "ACE inhibitors, dietary changes",
        notes: "Family history of hypertension. BP: 150/95 mmHg. Lifestyle counseling provided.",
        followUpDate: "2024-02-22",
      },
      {
        patientId: patientIds[7],
        doctorId: doctorIds[3],
        visitDate: new Date("2024-01-23").getTime(),
        symptoms: "Acne breakouts, oily skin, blackheads",
        diagnosis: "Acne Vulgaris (Moderate)",
        treatment: "Topical retinoids, benzoyl peroxide",
        notes: "Hormonal acne. Advised proper skincare routine and diet modifications.",
        followUpDate: "2024-02-23",
      },
    ];

    const medicalRecordIds = [];
    for (const record of medicalRecords) {
      const recordId = await ctx.db.insert("medicalRecords", record);
      medicalRecordIds.push(recordId);
    }

    // Create prescriptions
    const prescriptions = [
      {
        medicalRecordId: medicalRecordIds[0],
        patientId: patientIds[0],
        doctorId: doctorIds[0],
        medicationName: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take in the morning with food. Monitor blood pressure daily.",
        prescribedDate: new Date("2024-01-15").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[1],
        patientId: patientIds[1],
        doctorId: doctorIds[3],
        medicationName: "Hydrocortisone Cream",
        dosage: "1%",
        frequency: "Twice daily",
        duration: "7 days",
        instructions: "Apply thin layer on affected areas. Avoid contact with eyes.",
        prescribedDate: new Date("2024-01-16").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[2],
        patientId: patientIds[2],
        doctorId: doctorIds[4],
        medicationName: "Paracetamol",
        dosage: "500mg",
        frequency: "Three times daily",
        duration: "5 days",
        instructions: "Take after meals. Drink plenty of fluids. Complete rest.",
        prescribedDate: new Date("2024-01-17").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[3],
        patientId: patientIds[3],
        doctorId: doctorIds[1],
        medicationName: "Sumatriptan",
        dosage: "50mg",
        frequency: "As needed",
        duration: "10 tablets",
        instructions: "Take at onset of migraine. Maximum 2 tablets in 24 hours.",
        prescribedDate: new Date("2024-01-18").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[4],
        patientId: patientIds[4],
        doctorId: doctorIds[2],
        medicationName: "Diclofenac",
        dosage: "50mg",
        frequency: "Twice daily",
        duration: "10 days",
        instructions: "Take after meals. Apply ice pack for 15 minutes, 3 times daily.",
        prescribedDate: new Date("2024-01-19").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[5],
        patientId: patientIds[5],
        doctorId: doctorIds[4],
        medicationName: "Dextromethorphan Syrup",
        dosage: "10ml",
        frequency: "Three times daily",
        duration: "7 days",
        instructions: "Take after meals. Avoid cold drinks. Steam inhalation twice daily.",
        prescribedDate: new Date("2024-01-20").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[6],
        patientId: patientIds[6],
        doctorId: doctorIds[0],
        medicationName: "Enalapril",
        dosage: "10mg",
        frequency: "Twice daily",
        duration: "30 days",
        instructions: "Take morning and evening. Monitor BP. Low salt diet.",
        prescribedDate: new Date("2024-01-22").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[7],
        patientId: patientIds[7],
        doctorId: doctorIds[3],
        medicationName: "Tretinoin Gel",
        dosage: "0.025%",
        frequency: "Once daily at night",
        duration: "30 days",
        instructions: "Apply thin layer. Use sunscreen during day. Avoid harsh scrubs.",
        prescribedDate: new Date("2024-01-23").getTime(),
      },
    ];

    for (const prescription of prescriptions) {
      await ctx.db.insert("prescriptions", prescription);
    }

    return {
      message: "Sample data inserted successfully!",
      summary: {
        doctors: doctors.length,
        patients: patients.length,
        appointments: appointments.length,
        medicalRecords: medicalRecords.length,
        prescriptions: prescriptions.length,
      },
    };
  },
});
