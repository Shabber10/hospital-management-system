-- CareWeave IQ Seed Data
USE careweave_iq;

-- Insert demo users with hashed passwords
-- Password for all demo users: "CareWeave123!"
-- BCrypt hash: $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu

-- Demo Doctors
INSERT INTO users (username, email, password_hash, role, is_active) VALUES
('dr.sharma', 'dr.sharma@careweave.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'DOCTOR', TRUE),
('dr.patel', 'dr.patel@careweave.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'DOCTOR', TRUE),
('dr.singh', 'dr.singh@careweave.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'DOCTOR', TRUE);

-- Demo Patients
INSERT INTO users (username, email, password_hash, role, is_active) VALUES
('rohan.mehta', 'rohan.mehta@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'PATIENT', TRUE),
('priya.nair', 'priya.nair@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'PATIENT', TRUE),
('sameer.shaikh', 'sameer.shaikh@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'PATIENT', TRUE),
('ananya.roy', 'ananya.roy@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'PATIENT', TRUE),
('karan.verma', 'karan.verma@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'PATIENT', TRUE),
('deepak.singh', 'deepak.singh@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'PATIENT', TRUE),
('neha.gupta', 'neha.gupta@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'PATIENT', TRUE),
('vikram.patil', 'vikram.patil@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'PATIENT', TRUE),
('meera.joshi', 'meera.joshi@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'PATIENT', TRUE),
('harshita.jain', 'harshita.jain@email.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBVtQ7EuJzqHxu', 'PATIENT', TRUE);

-- Insert doctor profiles
INSERT INTO doctors (user_id, first_name, last_name, specialization, license_number, phone, qualification, experience_years, consultation_fee) VALUES
(1, 'Rajesh', 'Sharma', 'General Medicine', 'MED001', '+91-9876543210', 'MBBS, MD Internal Medicine', 15, 500.00),
(2, 'Kavita', 'Patel', 'Cardiology', 'MED002', '+91-9876543211', 'MBBS, DM Cardiology', 12, 800.00),
(3, 'Amit', 'Singh', 'Endocrinology', 'MED003', '+91-9876543212', 'MBBS, DM Endocrinology', 10, 700.00);

-- Insert patient profiles
INSERT INTO patients (user_id, first_name, last_name, date_of_birth, gender, phone, address, emergency_contact, emergency_phone, blood_group, allergies) VALUES
(4, 'Rohan', 'Mehta', '1992-03-15', 'MALE', '+91-9123456789', '123 MG Road, Mumbai', 'Sunita Mehta', '+91-9123456790', 'B+', 'None'),
(5, 'Priya', 'Nair', '1999-07-22', 'FEMALE', '+91-9123456791', '456 Brigade Road, Bangalore', 'Ravi Nair', '+91-9123456792', 'O+', 'Dust, Pollen'),
(6, 'Sameer', 'Shaikh', '1984-11-08', 'MALE', '+91-9123456793', '789 Park Street, Kolkata', 'Fatima Shaikh', '+91-9123456794', 'A+', 'None'),
(7, 'Ananya', 'Roy', '2005-01-12', 'FEMALE', '+91-9123456795', '321 CP, New Delhi', 'Subhash Roy', '+91-9123456796', 'AB+', 'Penicillin'),
(8, 'Karan', 'Verma', '1969-05-30', 'MALE', '+91-9123456797', '654 FC Road, Pune', 'Meera Verma', '+91-9123456798', 'B-', 'None'),
(9, 'Deepak', 'Singh', '1996-09-18', 'MALE', '+91-9123456799', '987 Mall Road, Shimla', 'Pooja Singh', '+91-9123456800', 'O-', 'None'),
(10, 'Neha', 'Gupta', '1990-12-25', 'FEMALE', '+91-9123456801', '147 Residency Road, Indore', 'Rajesh Gupta', '+91-9123456802', 'A-', 'Sulfa drugs'),
(11, 'Vikram', 'Patil', '1979-04-03', 'MALE', '+91-9123456803', '258 JM Road, Pune', 'Shweta Patil', '+91-9123456804', 'B+', 'None'),
(12, 'Meera', 'Joshi', '1995-08-14', 'FEMALE', '+91-9123456805', '369 SG Highway, Ahmedabad', 'Prakash Joshi', '+91-9123456806', 'O+', 'None'),
(13, 'Harshita', 'Jain', '2002-06-07', 'FEMALE', '+91-9123456807', '741 MI Road, Jaipur', 'Suresh Jain', '+91-9123456808', 'AB-', 'None');

-- Insert sample medical records
INSERT INTO medical_records (patient_id, doctor_id, visit_date, symptoms, diagnosis, treatment, notes) VALUES
(1, 1, '2024-01-15 10:30:00', 'High fever, headache, abdominal pain', 'Typhoid Fever', 'Antibiotic therapy with Cefixime', 'Patient responded well to treatment'),
(2, 2, '2024-01-20 14:15:00', 'Shortness of breath, wheezing', 'Asthma exacerbation', 'Bronchodilator therapy', 'Advised to avoid triggers'),
(3, 3, '2024-01-25 11:00:00', 'Increased thirst, frequent urination', 'Type 2 Diabetes Mellitus', 'Metformin therapy initiated', 'Dietary counseling provided'),
(4, 1, '2024-02-01 09:45:00', 'Fatigue, pale skin, weakness', 'Iron deficiency anemia', 'Iron supplementation', 'Follow-up in 6 weeks'),
(5, 2, '2024-02-05 16:30:00', 'Chest pain, elevated BP', 'Hypertension', 'ACE inhibitor therapy', 'Lifestyle modifications advised'),
(6, 1, '2024-02-10 12:20:00', 'Severe headache, nausea', 'Migraine', 'Triptan therapy', 'Trigger identification needed'),
(7, 3, '2024-02-15 10:15:00', 'Weight gain, fatigue, cold intolerance', 'Hypothyroidism', 'Levothyroxine therapy', 'Regular monitoring required'),
(8, 1, '2024-02-20 15:45:00', 'Severe flank pain, hematuria', 'Nephrolithiasis', 'Pain management and hydration', 'Lithotripsy may be needed'),
(9, 3, '2024-02-25 11:30:00', 'Irregular periods, weight gain', 'PCOS', 'Hormonal therapy', 'Lifestyle modifications important'),
(10, 1, '2024-03-01 14:00:00', 'Persistent worry, sleep issues', 'Anxiety disorder', 'Counseling and medication', 'Regular follow-up scheduled');

-- Insert sample prescriptions
INSERT INTO prescriptions (medical_record_id, patient_id, doctor_id, medication_name, dosage, frequency, duration, instructions) VALUES
(1, 1, 1, 'Cefixime', '200mg', 'Twice daily', '7 days', 'Take with food'),
(1, 1, 1, 'Paracetamol', '500mg', 'Three times daily', '5 days', 'For fever and pain'),
(2, 2, 2, 'Budecort Inhaler', '200mcg', 'Twice daily', '30 days', 'Rinse mouth after use'),
(2, 2, 2, 'Montair LC', '10mg', 'Once daily at night', '30 days', 'Take before bedtime'),
(3, 3, 3, 'Metformin', '500mg', 'Twice daily', '90 days', 'Take with meals'),
(4, 4, 1, 'Ferrous Sulfate', '325mg', 'Once daily', '60 days', 'Take on empty stomach'),
(4, 4, 1, 'Folic Acid', '5mg', 'Once daily', '60 days', 'Take with iron supplement'),
(5, 5, 2, 'Amlodipine', '5mg', 'Once daily', '90 days', 'Take at same time daily'),
(6, 6, 1, 'Sumatriptan', '50mg', 'As needed', '10 tablets', 'For migraine attacks only'),
(7, 7, 3, 'Levothyroxine', '50mcg', 'Once daily morning', '90 days', 'Take on empty stomach'),
(8, 8, 1, 'Tamsulosin', '0.4mg', 'Once daily', '30 days', 'Take after meals'),
(8, 8, 1, 'Diclofenac', '50mg', 'Twice daily', '5 days', 'For pain relief'),
(9, 9, 3, 'Myo-inositol', '2g', 'Twice daily', '90 days', 'Mix with water'),
(10, 10, 1, 'Sertraline', '50mg', 'Once daily', '30 days', 'Take with food, avoid alcohol');
