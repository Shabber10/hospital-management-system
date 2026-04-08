import { mutation } from "./_generated/server";

export const insertCompleteSampleData = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data first (optional)
    console.log("Starting to insert comprehensive sample data...");

    // 1. Create Users for Doctors
    const doctorUsers = [
      {
        name: "Dr. Rajesh Kumar Sharma",
        email: "rajesh.sharma@careweave.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Dr. Priya Mehta",
        email: "priya.mehta@careweave.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Dr. Amit Singh Patel",
        email: "amit.patel@careweave.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Dr. Sunita Reddy",
        email: "sunita.reddy@careweave.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Dr. Vikram Gupta",
        email: "vikram.gupta@careweave.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Dr. Kavya Nair",
        email: "kavya.nair@careweave.com",
        emailVerificationTime: Date.now(),
      },
    ];

    const doctorUserIds = [];
    for (const user of doctorUsers) {
      const userId = await ctx.db.insert("users", user);
      doctorUserIds.push(userId);
    }

    // 2. Create Users for Patients
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
        name: "Kavya Iyer",
        email: "kavya.iyer@gmail.com",
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
      {
        name: "Ravi Kumar",
        email: "ravi.kumar@gmail.com",
        emailVerificationTime: Date.now(),
      },
      {
        name: "Sneha Pillai",
        email: "sneha.pillai@gmail.com",
        emailVerificationTime: Date.now(),
      },
    ];

    const patientUserIds = [];
    for (const user of patientUsers) {
      const userId = await ctx.db.insert("users", user);
      patientUserIds.push(userId);
    }

    // 3. Create Doctor Profiles
    const doctors = [
      {
        userId: doctorUserIds[0],
        firstName: "Rajesh Kumar",
        lastName: "Sharma",
        specialization: "Cardiologist",
        licenseNumber: "MH/CARD/2018/12345",
        phone: "+91-9876543210",
        qualification: "MBBS, MD (Cardiology), DM (Interventional Cardiology)",
        experienceYears: 15,
        consultationFee: 1200,
        availableFrom: "09:00",
        availableTo: "17:00",
      },
      {
        userId: doctorUserIds[1],
        firstName: "Priya",
        lastName: "Mehta",
        specialization: "Neurologist",
        licenseNumber: "DL/NEURO/2019/67890",
        phone: "+91-9876543211",
        qualification: "MBBS, MD (Neurology), DM (Neurology)",
        experienceYears: 12,
        consultationFee: 1500,
        availableFrom: "10:00",
        availableTo: "18:00",
      },
      {
        userId: doctorUserIds[2],
        firstName: "Amit Singh",
        lastName: "Patel",
        specialization: "Orthopedic",
        licenseNumber: "GJ/ORTHO/2020/11111",
        phone: "+91-9876543212",
        qualification: "MBBS, MS (Orthopedics), MCh (Joint Replacement)",
        experienceYears: 18,
        consultationFee: 1000,
        availableFrom: "08:00",
        availableTo: "16:00",
      },
      {
        userId: doctorUserIds[3],
        firstName: "Sunita",
        lastName: "Reddy",
        specialization: "Dermatologist",
        licenseNumber: "AP/DERM/2021/22222",
        phone: "+91-9876543213",
        qualification: "MBBS, MD (Dermatology), Fellowship in Cosmetic Dermatology",
        experienceYears: 8,
        consultationFee: 800,
        availableFrom: "11:00",
        availableTo: "19:00",
      },
      {
        userId: doctorUserIds[4],
        firstName: "Vikram",
        lastName: "Gupta",
        specialization: "General Physician",
        licenseNumber: "UP/GP/2017/33333",
        phone: "+91-9876543214",
        qualification: "MBBS, MD (Internal Medicine)",
        experienceYears: 14,
        consultationFee: 600,
        availableFrom: "09:00",
        availableTo: "17:00",
      },
      {
        userId: doctorUserIds[5],
        firstName: "Kavya",
        lastName: "Nair",
        specialization: "Pediatrician",
        licenseNumber: "KL/PED/2022/44444",
        phone: "+91-9876543215",
        qualification: "MBBS, MD (Pediatrics), Fellowship in Neonatology",
        experienceYears: 6,
        consultationFee: 700,
        availableFrom: "10:00",
        availableTo: "18:00",
      },
    ];

    const doctorIds = [];
    for (const doctor of doctors) {
      const doctorId = await ctx.db.insert("doctors", doctor);
      doctorIds.push(doctorId);
    }

    // 4. Create Patient Profiles
    const patients = [
      {
        userId: patientUserIds[0],
        firstName: "Rahul",
        lastName: "Sharma",
        dateOfBirth: "1985-03-15",
        gender: "MALE" as const,
        phone: "+91-8765432109",
        address: "A-204, Sunrise Apartments, Andheri West, Mumbai - 400058",
        emergencyContact: "Sunita Sharma (Wife)",
        emergencyPhone: "+91-8765432108",
        bloodGroup: "B+",
        allergies: "Penicillin, Dust mites",
      },
      {
        userId: patientUserIds[1],
        firstName: "Anita",
        lastName: "Gupta",
        dateOfBirth: "1990-07-22",
        gender: "FEMALE" as const,
        phone: "+91-8765432110",
        address: "B-15, Green Valley Society, Sector 18, Noida - 201301",
        emergencyContact: "Rajesh Gupta (Husband)",
        emergencyPhone: "+91-8765432111",
        bloodGroup: "A+",
        allergies: "Shellfish, Latex",
      },
      {
        userId: patientUserIds[2],
        firstName: "Suresh",
        lastName: "Mehta",
        dateOfBirth: "1975-11-08",
        gender: "MALE" as const,
        phone: "+91-8765432112",
        address: "C-301, Royal Heights, Bandra East, Mumbai - 400051",
        emergencyContact: "Meera Mehta (Wife)",
        emergencyPhone: "+91-8765432113",
        bloodGroup: "O+",
        allergies: "None known",
      },
      {
        userId: patientUserIds[3],
        firstName: "Kavya",
        lastName: "Iyer",
        dateOfBirth: "1992-05-14",
        gender: "FEMALE" as const,
        phone: "+91-8765432114",
        address: "D-12, Lotus Residency, Koramangala, Bangalore - 560034",
        emergencyContact: "Arun Iyer (Father)",
        emergencyPhone: "+91-8765432115",
        bloodGroup: "AB+",
        allergies: "Sulfa drugs",
      },
      {
        userId: patientUserIds[4],
        firstName: "Arjun",
        lastName: "Verma",
        dateOfBirth: "1988-09-30",
        gender: "MALE" as const,
        phone: "+91-8765432116",
        address: "E-45, Paradise Colony, Jubilee Hills, Hyderabad - 500033",
        emergencyContact: "Priya Verma (Wife)",
        emergencyPhone: "+91-8765432117",
        bloodGroup: "A-",
        allergies: "Peanuts, Tree nuts",
      },
      {
        userId: patientUserIds[5],
        firstName: "Deepika",
        lastName: "Joshi",
        dateOfBirth: "1995-12-03",
        gender: "FEMALE" as const,
        phone: "+91-8765432118",
        address: "F-78, Silver Oak Apartments, Vastrapur, Ahmedabad - 380015",
        emergencyContact: "Vikash Joshi (Brother)",
        emergencyPhone: "+91-8765432119",
        bloodGroup: "B-",
        allergies: "Aspirin, NSAIDs",
      },
      {
        userId: patientUserIds[6],
        firstName: "Manish",
        lastName: "Agarwal",
        dateOfBirth: "1982-01-25",
        gender: "MALE" as const,
        phone: "+91-8765432120",
        address: "G-23, Golden Heights, Civil Lines, Delhi - 110054",
        emergencyContact: "Neha Agarwal (Wife)",
        emergencyPhone: "+91-8765432121",
        bloodGroup: "O-",
        allergies: "Iodine contrast",
      },
      {
        userId: patientUserIds[7],
        firstName: "Pooja",
        lastName: "Bansal",
        dateOfBirth: "1987-06-18",
        gender: "FEMALE" as const,
        phone: "+91-8765432122",
        address: "H-56, Rose Garden Society, Malviya Nagar, Jaipur - 302017",
        emergencyContact: "Rohit Bansal (Husband)",
        emergencyPhone: "+91-8765432123",
        bloodGroup: "AB-",
        allergies: "Codeine, Morphine",
      },
      {
        userId: patientUserIds[8],
        firstName: "Ravi",
        lastName: "Kumar",
        dateOfBirth: "1993-04-12",
        gender: "MALE" as const,
        phone: "+91-8765432124",
        address: "I-89, Tech Park Residency, Electronic City, Bangalore - 560100",
        emergencyContact: "Sita Kumar (Mother)",
        emergencyPhone: "+91-8765432125",
        bloodGroup: "B+",
        allergies: "Egg proteins",
      },
      {
        userId: patientUserIds[9],
        firstName: "Sneha",
        lastName: "Pillai",
        dateOfBirth: "1991-08-27",
        gender: "FEMALE" as const,
        phone: "+91-8765432126",
        address: "J-34, Marina View Apartments, Marine Drive, Kochi - 682031",
        emergencyContact: "Raj Pillai (Father)",
        emergencyPhone: "+91-8765432127",
        bloodGroup: "A+",
        allergies: "Contrast dye, Seafood",
      },
    ];

    const patientIds = [];
    for (const patient of patients) {
      const patientId = await ctx.db.insert("patients", patient);
      patientIds.push(patientId);
    }

    // 5. Create Appointments
    const appointments = [
      {
        patientId: patientIds[0], // Rahul Sharma
        doctorId: doctorIds[0], // Dr. Rajesh (Cardiologist)
        appointmentDate: "2024-01-15",
        appointmentTime: "10:00",
        status: "COMPLETED" as const,
        symptoms: "Chest pain, shortness of breath during exercise",
        notes: "Follow-up for hypertension management",
      },
      {
        patientId: patientIds[1], // Anita Gupta
        doctorId: doctorIds[3], // Dr. Sunita (Dermatologist)
        appointmentDate: "2024-01-16",
        appointmentTime: "14:00",
        status: "COMPLETED" as const,
        symptoms: "Persistent skin rash on arms and face",
        notes: "Allergic reaction assessment",
      },
      {
        patientId: patientIds[2], // Suresh Mehta
        doctorId: doctorIds[4], // Dr. Vikram (General Physician)
        appointmentDate: "2024-01-17",
        appointmentTime: "11:00",
        status: "COMPLETED" as const,
        symptoms: "High fever, body ache, severe headache",
        notes: "Suspected dengue fever",
      },
      {
        patientId: patientIds[3], // Kavya Iyer
        doctorId: doctorIds[1], // Dr. Priya (Neurologist)
        appointmentDate: "2024-01-18",
        appointmentTime: "15:30",
        status: "COMPLETED" as const,
        symptoms: "Severe migraines, sensitivity to light",
        notes: "Chronic migraine evaluation",
      },
      {
        patientId: patientIds[4], // Arjun Verma
        doctorId: doctorIds[2], // Dr. Amit (Orthopedic)
        appointmentDate: "2024-01-19",
        appointmentTime: "09:30",
        status: "COMPLETED" as const,
        symptoms: "Lower back pain, difficulty in movement",
        notes: "Work-related back injury assessment",
      },
      {
        patientId: patientIds[5], // Deepika Joshi
        doctorId: doctorIds[4], // Dr. Vikram (General Physician)
        appointmentDate: "2024-01-20",
        appointmentTime: "12:00",
        status: "COMPLETED" as const,
        symptoms: "Persistent cough, throat irritation",
        notes: "Upper respiratory tract infection",
      },
      {
        patientId: patientIds[6], // Manish Agarwal
        doctorId: doctorIds[0], // Dr. Rajesh (Cardiologist)
        appointmentDate: "2024-01-22",
        appointmentTime: "16:00",
        status: "COMPLETED" as const,
        symptoms: "High blood pressure, occasional chest discomfort",
        notes: "Hypertension management and lifestyle counseling",
      },
      {
        patientId: patientIds[7], // Pooja Bansal
        doctorId: doctorIds[3], // Dr. Sunita (Dermatologist)
        appointmentDate: "2024-01-23",
        appointmentTime: "13:30",
        status: "COMPLETED" as const,
        symptoms: "Acne breakouts, oily skin texture",
        notes: "Hormonal acne treatment consultation",
      },
      {
        patientId: patientIds[8], // Ravi Kumar
        doctorId: doctorIds[4], // Dr. Vikram (General Physician)
        appointmentDate: "2024-01-25",
        appointmentTime: "10:30",
        status: "SCHEDULED" as const,
        symptoms: "Diabetes follow-up, blood sugar monitoring",
        notes: "Regular diabetes management checkup",
      },
      {
        patientId: patientIds[9], // Sneha Pillai
        doctorId: doctorIds[1], // Dr. Priya (Neurologist)
        appointmentDate: "2024-01-26",
        appointmentTime: "14:30",
        status: "SCHEDULED" as const,
        symptoms: "Frequent headaches, stress-related symptoms",
        notes: "Stress management and neurological evaluation",
      },
      {
        patientId: patientIds[0], // Rahul Sharma
        doctorId: doctorIds[4], // Dr. Vikram (General Physician)
        appointmentDate: "2024-01-28",
        appointmentTime: "11:00",
        status: "SCHEDULED" as const,
        symptoms: "Diabetes management, routine checkup",
        notes: "Monthly diabetes monitoring",
      },
      {
        patientId: patientIds[2], // Suresh Mehta
        doctorId: doctorIds[2], // Dr. Amit (Orthopedic)
        appointmentDate: "2024-01-29",
        appointmentTime: "15:00",
        status: "SCHEDULED" as const,
        symptoms: "Knee joint pain, morning stiffness",
        notes: "Arthritis evaluation and treatment",
      },
    ];

    const appointmentIds = [];
    for (const appointment of appointments) {
      const appointmentId = await ctx.db.insert("appointments", appointment);
      appointmentIds.push(appointmentId);
    }

    // 6. Create Medical Records
    const medicalRecords = [
      {
        patientId: patientIds[0], // Rahul Sharma
        doctorId: doctorIds[0], // Dr. Rajesh (Cardiologist)
        visitDate: new Date("2024-01-15").getTime(),
        symptoms: "Chest pain during physical activity, shortness of breath, fatigue",
        diagnosis: "Hypertension Stage 2, Coronary Artery Disease (mild)",
        treatment: "Lifestyle modifications, antihypertensive medication, cardiac rehabilitation",
        notes: "Patient advised to reduce salt intake, regular exercise. Blood pressure: 160/100 mmHg. ECG shows mild abnormalities.",
        followUpDate: "2024-02-15",
      },
      {
        patientId: patientIds[1], // Anita Gupta
        doctorId: doctorIds[3], // Dr. Sunita (Dermatologist)
        visitDate: new Date("2024-01-16").getTime(),
        symptoms: "Red, itchy rash on arms and face, swelling around eyes",
        diagnosis: "Contact Dermatitis with secondary bacterial infection",
        treatment: "Topical corticosteroids, oral antihistamines, antibiotic cream",
        notes: "Allergic reaction to new cosmetic product. Patch test recommended. Avoid known allergens.",
        followUpDate: "2024-01-30",
      },
      {
        patientId: patientIds[2], // Suresh Mehta
        doctorId: doctorIds[4], // Dr. Vikram (General Physician)
        visitDate: new Date("2024-01-17").getTime(),
        symptoms: "High fever (104°F), severe body ache, headache, nausea, vomiting",
        diagnosis: "Dengue Fever (confirmed by NS1 antigen test)",
        treatment: "Supportive care, fluid management, platelet monitoring",
        notes: "Platelet count: 80,000. Hospitalization recommended for monitoring. Strict bed rest advised.",
        followUpDate: "2024-01-24",
      },
      {
        patientId: patientIds[3], // Kavya Iyer
        doctorId: doctorIds[1], // Dr. Priya (Neurologist)
        visitDate: new Date("2024-01-18").getTime(),
        symptoms: "Severe throbbing headaches, sensitivity to light and sound, nausea",
        diagnosis: "Chronic Migraine with Aura",
        treatment: "Preventive medication (Topiramate), acute treatment (Sumatriptan)",
        notes: "Stress and hormonal triggers identified. MRI brain normal. Lifestyle modifications advised.",
        followUpDate: "2024-02-18",
      },
      {
        patientId: patientIds[4], // Arjun Verma
        doctorId: doctorIds[2], // Dr. Amit (Orthopedic)
        visitDate: new Date("2024-01-19").getTime(),
        symptoms: "Lower back pain radiating to left leg, muscle stiffness, difficulty bending",
        diagnosis: "Lumbar Disc Herniation (L4-L5), Sciatica",
        treatment: "NSAIDs, muscle relaxants, physiotherapy, ergonomic workplace setup",
        notes: "MRI shows disc protrusion. Conservative treatment recommended. Surgery if no improvement in 6 weeks.",
        followUpDate: "2024-02-02",
      },
      {
        patientId: patientIds[5], // Deepika Joshi
        doctorId: doctorIds[4], // Dr. Vikram (General Physician)
        visitDate: new Date("2024-01-20").getTime(),
        symptoms: "Persistent dry cough for 2 weeks, sore throat, mild fever",
        diagnosis: "Upper Respiratory Tract Infection (Viral)",
        treatment: "Symptomatic treatment, cough suppressants, throat lozenges, steam inhalation",
        notes: "Chest X-ray normal. Viral etiology suspected. Antibiotics not indicated. Adequate rest advised.",
        followUpDate: "2024-01-27",
      },
      {
        patientId: patientIds[6], // Manish Agarwal
        doctorId: doctorIds[0], // Dr. Rajesh (Cardiologist)
        visitDate: new Date("2024-01-22").getTime(),
        symptoms: "Elevated blood pressure readings, occasional chest discomfort, fatigue",
        diagnosis: "Essential Hypertension, Metabolic Syndrome",
        treatment: "ACE inhibitors, lifestyle modifications, dietary counseling",
        notes: "BP: 150/95 mmHg. BMI: 28.5. Family history of hypertension. DASH diet recommended.",
        followUpDate: "2024-02-22",
      },
      {
        patientId: patientIds[7], // Pooja Bansal
        doctorId: doctorIds[3], // Dr. Sunita (Dermatologist)
        visitDate: new Date("2024-01-23").getTime(),
        symptoms: "Persistent acne on face and back, oily skin, blackheads",
        diagnosis: "Acne Vulgaris (Moderate to Severe), Seborrheic Dermatitis",
        treatment: "Topical retinoids, benzoyl peroxide, oral contraceptives for hormonal control",
        notes: "Hormonal acne pattern. PCOS screening recommended. Skincare routine education provided.",
        followUpDate: "2024-02-23",
      },
      {
        patientId: patientIds[8], // Ravi Kumar
        doctorId: doctorIds[4], // Dr. Vikram (General Physician)
        visitDate: new Date("2024-01-10").getTime(),
        symptoms: "Increased thirst, frequent urination, unexplained weight loss, fatigue",
        diagnosis: "Type 2 Diabetes Mellitus (newly diagnosed)",
        treatment: "Metformin, dietary modifications, blood glucose monitoring",
        notes: "HbA1c: 8.2%. Fasting glucose: 180 mg/dl. Diabetic education provided. Regular monitoring required.",
        followUpDate: "2024-01-25",
      },
      {
        patientId: patientIds[9], // Sneha Pillai
        doctorId: doctorIds[1], // Dr. Priya (Neurologist)
        visitDate: new Date("2024-01-12").getTime(),
        symptoms: "Frequent tension headaches, neck stiffness, work-related stress",
        diagnosis: "Tension-Type Headache, Cervical Spondylosis (mild)",
        treatment: "Stress management techniques, muscle relaxants, ergonomic corrections",
        notes: "Work-related stress identified as trigger. Cervical X-ray shows mild degenerative changes.",
        followUpDate: "2024-01-26",
      },
    ];

    const medicalRecordIds = [];
    for (const record of medicalRecords) {
      const recordId = await ctx.db.insert("medicalRecords", record);
      medicalRecordIds.push(recordId);
    }

    // 7. Create Prescriptions
    const prescriptions = [
      {
        medicalRecordId: medicalRecordIds[0],
        patientId: patientIds[0], // Rahul Sharma
        doctorId: doctorIds[0], // Dr. Rajesh
        medicationName: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily in the morning",
        duration: "30 days",
        instructions: "Take with food. Monitor blood pressure daily. Avoid grapefruit juice.",
        prescribedDate: new Date("2024-01-15").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[0],
        patientId: patientIds[0], // Rahul Sharma
        doctorId: doctorIds[0], // Dr. Rajesh
        medicationName: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily at bedtime",
        duration: "30 days",
        instructions: "Take at night. Avoid alcohol. Report muscle pain immediately.",
        prescribedDate: new Date("2024-01-15").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[1],
        patientId: patientIds[1], // Anita Gupta
        doctorId: doctorIds[3], // Dr. Sunita
        medicationName: "Hydrocortisone Cream",
        dosage: "1%",
        frequency: "Apply twice daily",
        duration: "10 days",
        instructions: "Apply thin layer on affected areas. Avoid contact with eyes. Do not use on face for more than 5 days.",
        prescribedDate: new Date("2024-01-16").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[1],
        patientId: patientIds[1], // Anita Gupta
        doctorId: doctorIds[3], // Dr. Sunita
        medicationName: "Cetirizine",
        dosage: "10mg",
        frequency: "Once daily at bedtime",
        duration: "7 days",
        instructions: "May cause drowsiness. Avoid driving. Take with water.",
        prescribedDate: new Date("2024-01-16").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[2],
        patientId: patientIds[2], // Suresh Mehta
        doctorId: doctorIds[4], // Dr. Vikram
        medicationName: "Paracetamol",
        dosage: "650mg",
        frequency: "Every 6 hours as needed",
        duration: "7 days",
        instructions: "Take for fever and body ache. Do not exceed 4 doses per day. Take with food.",
        prescribedDate: new Date("2024-01-17").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[3],
        patientId: patientIds[3], // Kavya Iyer
        doctorId: doctorIds[1], // Dr. Priya
        medicationName: "Sumatriptan",
        dosage: "50mg",
        frequency: "As needed for migraine",
        duration: "6 tablets",
        instructions: "Take at onset of migraine. Maximum 2 tablets in 24 hours. Rest in dark room.",
        prescribedDate: new Date("2024-01-18").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[3],
        patientId: patientIds[3], // Kavya Iyer
        doctorId: doctorIds[1], // Dr. Priya
        medicationName: "Topiramate",
        dosage: "25mg",
        frequency: "Once daily at bedtime",
        duration: "30 days",
        instructions: "Preventive medication. Increase water intake. May cause tingling in fingers.",
        prescribedDate: new Date("2024-01-18").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[4],
        patientId: patientIds[4], // Arjun Verma
        doctorId: doctorIds[2], // Dr. Amit
        medicationName: "Diclofenac",
        dosage: "50mg",
        frequency: "Twice daily after meals",
        duration: "14 days",
        instructions: "Take with food to avoid stomach upset. Apply ice pack for 15 minutes, 3 times daily.",
        prescribedDate: new Date("2024-01-19").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[4],
        patientId: patientIds[4], // Arjun Verma
        doctorId: doctorIds[2], // Dr. Amit
        medicationName: "Thiocolchicoside",
        dosage: "4mg",
        frequency: "Twice daily",
        duration: "10 days",
        instructions: "Muscle relaxant. May cause drowsiness. Avoid alcohol.",
        prescribedDate: new Date("2024-01-19").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[5],
        patientId: patientIds[5], // Deepika Joshi
        doctorId: doctorIds[4], // Dr. Vikram
        medicationName: "Dextromethorphan Syrup",
        dosage: "10ml",
        frequency: "Three times daily",
        duration: "7 days",
        instructions: "Take after meals. Avoid cold drinks. Steam inhalation twice daily recommended.",
        prescribedDate: new Date("2024-01-20").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[6],
        patientId: patientIds[6], // Manish Agarwal
        doctorId: doctorIds[0], // Dr. Rajesh
        medicationName: "Enalapril",
        dosage: "5mg",
        frequency: "Twice daily",
        duration: "30 days",
        instructions: "Take morning and evening. Monitor blood pressure. Follow low salt diet.",
        prescribedDate: new Date("2024-01-22").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[7],
        patientId: patientIds[7], // Pooja Bansal
        doctorId: doctorIds[3], // Dr. Sunita
        medicationName: "Tretinoin Gel",
        dosage: "0.025%",
        frequency: "Once daily at night",
        duration: "30 days",
        instructions: "Apply thin layer on clean skin. Use sunscreen during day. Avoid harsh scrubs.",
        prescribedDate: new Date("2024-01-23").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[7],
        patientId: patientIds[7], // Pooja Bansal
        doctorId: doctorIds[3], // Dr. Sunita
        medicationName: "Clindamycin Gel",
        dosage: "1%",
        frequency: "Twice daily",
        duration: "30 days",
        instructions: "Apply on acne lesions. Clean face before application. Avoid contact with eyes.",
        prescribedDate: new Date("2024-01-23").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[8],
        patientId: patientIds[8], // Ravi Kumar
        doctorId: doctorIds[4], // Dr. Vikram
        medicationName: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily with meals",
        duration: "30 days",
        instructions: "Take with breakfast and dinner. Monitor blood sugar. Follow diabetic diet.",
        prescribedDate: new Date("2024-01-10").getTime(),
      },
      {
        medicalRecordId: medicalRecordIds[9],
        patientId: patientIds[9], // Sneha Pillai
        doctorId: doctorIds[1], // Dr. Priya
        medicationName: "Ibuprofen",
        dosage: "400mg",
        frequency: "Twice daily after meals",
        duration: "10 days",
        instructions: "Take for headache relief. Avoid on empty stomach. Apply neck exercises as advised.",
        prescribedDate: new Date("2024-01-12").getTime(),
      },
    ];

    for (const prescription of prescriptions) {
      await ctx.db.insert("prescriptions", prescription);
    }

    return {
      message: "Complete CareWeave IQ sample data inserted successfully!",
      summary: {
        doctorUsers: doctorUsers.length,
        patientUsers: patientUsers.length,
        doctors: doctors.length,
        patients: patients.length,
        appointments: appointments.length,
        medicalRecords: medicalRecords.length,
        prescriptions: prescriptions.length,
      },
    };
  },
});
