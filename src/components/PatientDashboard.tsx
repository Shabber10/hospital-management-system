import { useState } from "react";
// mocked data
import { toast } from "sonner";
import { Heart, Activity, Thermometer, Droplets } from "lucide-react";

interface PatientDashboardProps {
  profile: any;
}

export function PatientDashboard({ profile }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const appointments: any[] = [];
  const medicalRecords: any[] = [];
  const prescriptions: any[] = [];
  const doctors: any[] = [];

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [bookingData, setBookingData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
    notes: "",
  });

  const createAppointment = async (data: any) => {};
  const availableSlots: string[] = ["10:00 AM", "11:00 AM", "2:00 PM"];

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAppointment({
        doctorId: selectedDoctor as any,
        appointmentDate: bookingData.appointmentDate,
        appointmentTime: bookingData.appointmentTime,
        symptoms: bookingData.symptoms,
        notes: bookingData.notes,
      });
      toast.success("Appointment booked successfully!");
      setShowBookingForm(false);
      setSelectedDoctor("");
      setBookingData({
        appointmentDate: "",
        appointmentTime: "",
        symptoms: "",
        notes: "",
      });
    } catch (error) {
      toast.error("Failed to book appointment: " + (error as Error).message);
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === "SCHEDULED" && new Date(apt.appointmentDate) >= new Date()
  );

  const recentRecords = medicalRecords.slice(0, 3);
  const activePrescriptions = prescriptions.filter(p => 
    new Date(p.prescribedDate + 30 * 24 * 60 * 60 * 1000) > new Date()
  );

  // Health vitals (static display data from hospital-management)
  const vitals = [
    { icon: Heart, label: "Heart Rate", value: "72", unit: "bpm", color: "text-red-500", bg: "bg-red-50", status: "normal", statusColor: "text-green-600" },
    { icon: Activity, label: "Blood Pressure", value: "120/80", unit: "mmHg", color: "text-blue-500", bg: "bg-blue-50", status: "normal", statusColor: "text-green-600" },
    { icon: Thermometer, label: "Temperature", value: "98.6", unit: "°F", color: "text-orange-500", bg: "bg-orange-50", status: "normal", statusColor: "text-green-600" },
    { icon: Droplets, label: "Blood Sugar", value: "95", unit: "mg/dL", color: "text-purple-500", bg: "bg-purple-50", status: "normal", statusColor: "text-green-600" },
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "vitals", label: "Health Vitals" },
            { id: "appointments", label: "Appointments" },
            { id: "records", label: "Medical Records" },
            { id: "prescriptions", label: "Prescriptions" },
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Appointments</h3>
              <p className="text-3xl font-bold text-blue-600">{upcomingAppointments.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Records</h3>
              <p className="text-3xl font-bold text-green-600">{medicalRecords.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Prescriptions</h3>
              <p className="text-3xl font-bold text-purple-600">{activePrescriptions.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Blood Group</h3>
              <p className="text-3xl font-bold text-red-600">{profile.bloodGroup || "N/A"}</p>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
              <button
                onClick={() => setShowBookingForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment._id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{appointment.doctor?.specialization}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.appointmentDate} at {appointment.appointmentTime}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {appointment.status}
                  </span>
                </div>
              ))}
              {upcomingAppointments.length === 0 && (
                <p className="text-gray-500">No upcoming appointments</p>
              )}
            </div>
          </div>

          {/* Recent Medical Records */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Medical Records</h3>
            <div className="space-y-3">
              {recentRecords.map((record) => (
                <div key={record._id} className="p-3 border rounded-lg">
                  <p className="font-medium text-sm">
                    Dr. {record.doctor?.firstName} {record.doctor?.lastName}
                  </p>
                  <p className="text-xs text-gray-600">{record.doctor?.specialization}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(record.visitDate).toLocaleDateString()}
                  </p>
                  {record.diagnosis && (
                    <p className="text-sm text-gray-700 mt-1">{record.diagnosis}</p>
                  )}
                </div>
              ))}
              {recentRecords.length === 0 && (
                <p className="text-gray-500 text-sm">No medical records yet</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Health Vitals Tab */}
      {activeTab === "vitals" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Vitals</h2>
          <p className="text-gray-500 text-sm mb-6">Last updated: today — values shown are sample readings for demonstration.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {vitals.map((v) => (
              <div key={v.label} className={`${v.bg} rounded-xl p-6 shadow-sm border border-gray-100`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-700">{v.label}</h4>
                  <v.icon className={`h-6 w-6 ${v.color}`} />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {v.value} <span className="text-base font-normal text-gray-500">{v.unit}</span>
                </p>
                <span className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 ${v.statusColor} capitalize`}>
                  ✓ {v.status}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <strong>Note:</strong> Vitals shown are sample readings. Connect a health monitor or use your doctor's portal to log real vitals.
          </div>
        </div>
      )}

      {/* Appointments Tab */}
      {activeTab === "appointments" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
            <button
              onClick={() => setShowBookingForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Book New Appointment
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{appointment.doctor?.specialization}</div>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Medical Records Tab */}
      {activeTab === "records" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Records</h2>
          
          <div className="space-y-4">
            {medicalRecords.map((record) => (
              <div key={record._id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Dr. {record.doctor?.firstName} {record.doctor?.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{record.doctor?.specialization}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(record.visitDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {record.symptoms && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Symptoms</h4>
                      <p className="text-sm text-gray-700">{record.symptoms}</p>
                    </div>
                  )}
                  {record.diagnosis && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Diagnosis</h4>
                      <p className="text-sm text-gray-700">{record.diagnosis}</p>
                    </div>
                  )}
                  {record.treatment && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Treatment</h4>
                      <p className="text-sm text-gray-700">{record.treatment}</p>
                    </div>
                  )}
                  {record.notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Notes</h4>
                      <p className="text-sm text-gray-700">{record.notes}</p>
                    </div>
                  )}
                </div>
                
                {record.followUpDate && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Follow-up Date:</strong> {record.followUpDate}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {medicalRecords.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No medical records yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Prescriptions Tab */}
      {activeTab === "prescriptions" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prescriptions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prescriptions.map((prescription) => (
              <div key={prescription._id} className="bg-white p-6 rounded-lg shadow">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{prescription.medicationName}</h3>
                  <p className="text-sm text-gray-600">
                    Prescribed by Dr. {prescription.doctor?.firstName} {prescription.doctor?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(prescription.prescribedDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dosage:</span>
                    <span className="font-medium">{prescription.dosage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium">{prescription.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{prescription.duration}</span>
                  </div>
                </div>
                
                {prescription.instructions && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Instructions:</strong> {prescription.instructions}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {prescriptions.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No prescriptions yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Appointment</h3>
            
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Doctor
                </label>
                <select
                  required
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingData.appointmentDate}
                  onChange={(e) => setBookingData({ ...bookingData, appointmentDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {availableSlots && availableSlots.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                  </label>
                  <select
                    required
                    value={bookingData.appointmentTime}
                    onChange={(e) => setBookingData({ ...bookingData, appointmentTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select time</option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms (Optional)
                </label>
                <textarea
                  value={bookingData.symptoms}
                  onChange={(e) => setBookingData({ ...bookingData, symptoms: e.target.value })}
                  rows={3}
                  placeholder="Describe your symptoms..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  rows={2}
                  placeholder="Any additional information..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedDoctor || !bookingData.appointmentDate || !bookingData.appointmentTime}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
