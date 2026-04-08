# CareWeave Healthcare Platform 🏥

A unified, premium healthcare management system created by combining **CareWeave IQ 2.0** and **Hospital Management System**.

## 🚀 Features

- **🛡️ Unified Authentication**: Secure login/register with role selection (Patient, Doctor, Admin).
- **🔐 Advanced Recovery**: 3-step OTP-based password reset system.
- **💓 Patient Dashboard**: Real-time health vitals (Heart Rate, BP, Temp, Sugar) + Medical Records & Prescriptions.
- **👨‍⚕️ Doctor Dashboard**: Manage appointments, patient history, and create prescriptions.
- **👑 Admin Dashboard**: Full user management and platform statistics.
- **🧠 Intelligent Backend**: Powered by Convex (Serverless) and Node.js/Express.

## 📁 Project Structure

```
CareWeave-Healthcare-Platform/
├── src/                  ← Vite + React 19 Frontend
│   ├── components/       ← Unified React components
│   └── pages/            ← Auth and specialized pages
├── backend/              ← Node.js/Express (OTP & User API)
├── convex/               ← Convex serverless functions & DB
└── index.html            ← Premium landing UI
```

## 🛠️ Getting Started

### 1. Initial Setup
```bash
npm install
cd backend && npm install
```

### 2. Run Locally
```bash
# In the root folder
npm run dev
```

### 3. Start OTP Server
```bash
cd backend
node server.js
```

## 🌐 Deployment
This project is ready to be deployed on **Vercel** or **Netlify**. Ensure you set your `VITE_CONVEX_URL` in the environment variables.

---
*Created by Shabber Hussain*
