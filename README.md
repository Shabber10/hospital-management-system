# CareWeave Healthcare Platform 🏥

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-success?style=for-the-badge)](https://shabber10.github.io/hospital-management-system/)

A unified, premium healthcare management system created by combining **CareWeave IQ 2.0** and **Hospital Management System**.

### 🚀 Getting Started

To see this app live, click on the **Live Demo** button above, or follow the [Deployment Guide](#🌐-deployment) below to host it yourself.

## 🚀 Features

- **🛡️ Unified Authentication**: Secure login/register with role selection (Patient, Doctor, Admin).
- **🔐 Advanced Recovery**: 3-step OTP-based password reset system.
- **💓 Patient Dashboard**: Real-time health vitals (Heart Rate, BP, Temp, Sugar) + Medical Records & Prescriptions.
- **👨‍⚕️ Doctor Dashboard**: Manage appointments, patient history, and create prescriptions.
- **👑 Admin Dashboard**: Full user management and platform statistics.
- **🧠 Intelligent Backend**: Powered by Node.js/Express and Neon PostgreSQL database.

## 📁 Project Structure

```
CareWeave-Healthcare-Platform/
├── src/                  ← Vite + React 19 Frontend
├── backend/              ← Node.js/Express (Auth & APIs)
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
This project is ready to be deployed on **GitHub Pages** (Frontend) and **Render** (Node Backend). Ensure you set your `DATABASE_URL` in the environment variables securely on the backend server.

---
*Created by Shabber Hussain*
