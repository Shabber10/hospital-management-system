import { useState } from "react";
// mocked data
import { toast } from "sonner";

interface DoctorDashboardProps {
  profile: any;
}

export function DoctorDashboard({ profile }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const appointments: any[] = [];
  const patients: any[] = [];

  const [showRecordForm, setShowRecordForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [recordData, setRecordData] = useState({
    symptoms: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    followUpDate: "",
  });

  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState("");
  const [prescriptionData, setPrescriptionData] = useState({
    medicationName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  const createMedicalRecord = async (data: any) => { return "dummy-id" };
  const createPrescription = async (data: any) => {};
  const updateAppointmentStatus = async (data: any) => {};

  const handleCreateRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const recordId = await createMedicalRecord({
        patientId: selectedPatient as any,
        ...recordData,
      });
      toast.success("Medical record created successfully!");
      setShowRecordForm(false);
      setSelectedPatient("");
      setRecordData({
        symptoms: "",
        diagnosis: "",
        treatment: "",
        notes: "",
        followUpDate: "",
      });
    } catch (error) {
      toast.error("Failed to create medical record: " + (error as Error).message);
    }
  };

  const handleCreatePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPrescription({
        medicalRecordId: selectedRecord as any,
        ...prescriptionData,
      });
      toast.success("Prescription created successfully!");
      setShowPrescriptionForm(false);
      setSelectedRecord("");
      setPrescriptionData({
        medicationName: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      });
    } catch (error) {
      toast.error("Failed to create prescription: " + (error as Error).message);
    }
  };

  const handleUpdateAppointment = async (appointmentId: string, status: string) => {
    try {
      await updateAppointmentStatus({
        appointmentId: appointmentId as any,
        status: status as any,
      });
      toast.success("Appointment status updated!");
    } catch (error) {
      toast.error("Failed to update appointment: " + (error as Error).message);
    }
  };

  const todayAppointments = appointments.filter(apt => 
    apt.appointmentDate === new Date().toISOString().split('T')[0]
  );

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === "SCHEDULED" && new Date(apt.appointmentDate) >= new Date()
  );

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "appointments", label: "Appointments" },
            { id: "patients", label: "Patients" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Appointments</h3>
              <p className="text-3xl font-bold text-blue-600">{todayAppointments.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming</h3>
              <p className="text-3xl font-bold text-green-600">{upcomingAppointments.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Patients</h3>
              <p className="text-3xl font-bold text-purple-600">{patients.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultation Fee</h3>
              <p className="text-3xl font-bold text-orange-600">₹{profile.consultationFee || 0}</p>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div key={appointment._id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      {appointment.patient?.firstName} {appointment.patient?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{appointment.appointmentTime}</p>
                    <p className="text-sm text-gray-500">{appointment.symptoms}</p>
                  </div>
                  <div className="flex gap-2">
                    {appointment.status === "SCHEDULED" && (
                      <>
                        <button
                          onClick={() => handleUpdateAppointment(appointment._id, "COMPLETED")}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleUpdateAppointment(appointment._id, "CANCELLED")}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {todayAppointments.length === 0 && (
                <p className="text-gray-500">No appointments today</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowRecordForm(true)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Medical Record
              </button>
              <button
                onClick={() => setShowPrescriptionForm(true)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Write Prescription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === "appointments" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Appointments</h2>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Symptoms
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patient?.firstName} {appointment.patient?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.patient?.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.appointmentDate} at {appointment.appointmentTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          appointment.status === "SCHEDULED" ? "bg-blue-100 text-blue-800" :
                          appointment.status === "COMPLETED" ? "bg-green-100 text-green-800" :
                          appointment.status === "CANCELLED" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {appointment.symptoms || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {appointment.status === "SCHEDULED" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateAppointment(appointment._id, "COMPLETED")}
                              className="text-green-600 hover:text-green-900"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => handleUpdateAppointment(appointment._id, "CANCELLED")}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Patients Tab */}
      {activeTab === "patients" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Patients</h2>
            <button
              onClick={() => setShowRecordForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Medical Record
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.map((patient) => (
              <div key={patient?._id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {patient?.firstName} {patient?.lastName}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  {patient?.phone && <p>📞 {patient.phone}</p>}
                  {patient?.bloodGroup && <p>🩸 {patient.bloodGroup}</p>}
                  {patient?.allergies && <p>⚠️ {patient.allergies}</p>}
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      if (patient?._id) {
                        setSelectedPatient(patient._id);
                        setShowRecordForm(true);
                      }
                    }}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Add Record
                  </button>
                </div>
              </div>
            ))}
            {patients.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No patients yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Medical Record Modal */}
      {showRecordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Medical Record</h3>
            
            <form onSubmit={handleCreateRecord} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Patient
                </label>
                <select
                  required
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a patient</option>
                  {patients.map((patient) => (
                    <option key={patient?._id} value={patient?._id}>
                      {patient?.firstName} {patient?.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms
                </label>
                <textarea
                  value={recordData.symptoms}
                  onChange={(e) => setRecordData({ ...recordData, symptoms: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnosis
                </label>
                <textarea
                  value={recordData.diagnosis}
                  onChange={(e) => setRecordData({ ...recordData, diagnosis: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment
                </label>
                <textarea
                  value={recordData.treatment}
                  onChange={(e) => setRecordData({ ...recordData, treatment: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={recordData.notes}
                  onChange={(e) => setRecordData({ ...recordData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={recordData.followUpDate}
                  onChange={(e) => setRecordData({ ...recordData, followUpDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRecordForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedPatient}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Prescription Modal */}
      {showPrescriptionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Write Prescription</h3>
            
            <form onSubmit={handleCreatePrescription} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Record ID
                </label>
                <input
                  type="text"
                  required
                  value={selectedRecord}
                  onChange={(e) => setSelectedRecord(e.target.value)}
                  placeholder="Enter medical record ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medication Name
                </label>
                <input
                  type="text"
                  required
                  value={prescriptionData.medicationName}
                  onChange={(e) => setPrescriptionData({ ...prescriptionData, medicationName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dosage
                  </label>
                  <input
                    type="text"
                    required
                    value={prescriptionData.dosage}
                    onChange={(e) => setPrescriptionData({ ...prescriptionData, dosage: e.target.value })}
                    placeholder="e.g., 500mg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <input
                    type="text"
                    required
                    value={prescriptionData.frequency}
                    onChange={(e) => setPrescriptionData({ ...prescriptionData, frequency: e.target.value })}
                    placeholder="e.g., Twice daily"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  required
                  value={prescriptionData.duration}
                  onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: e.target.value })}
                  placeholder="e.g., 7 days"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions
                </label>
                <textarea
                  value={prescriptionData.instructions}
                  onChange={(e) => setPrescriptionData({ ...prescriptionData, instructions: e.target.value })}
                  rows={3}
                  placeholder="Special instructions..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPrescriptionForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedRecord}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
