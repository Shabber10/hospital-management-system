import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { fadeIn, stagger, slideUp } from "../lib/motion-variants";
import { Trash2, Users, RefreshCw, ShieldCheck } from "lucide-react";

interface User {
  email: string;
  role: string;
}

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ patients: 0, doctors: 0, staff: 0 });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      const data: User[] = res.data;
      setUsers(data);
      setStats({
        patients: data.filter((u) => u.role === "patient").length,
        doctors: data.filter((u) => u.role === "doctor").length,
        staff: data.filter((u) => u.role === "staff").length,
      });
    } catch (err) {
      console.error("Failed to load users — is the Express backend running?", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (email: string) => {
    if (!window.confirm(`Delete user ${email}?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/delete/${encodeURIComponent(email)}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("❌ Failed to delete user");
    }
  };

  const roleColor = (role: string) => {
    switch (role) {
      case "doctor": return "bg-blue-100 text-blue-800";
      case "patient": return "bg-green-100 text-green-800";
      case "staff": return "bg-purple-100 text-purple-800";
      case "admin": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="show">
      {/* Header */}
      <motion.div variants={slideUp} className="mb-8 flex items-center gap-3">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage all registered users</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Patients", count: stats.patients, color: "bg-green-500" },
          { label: "Doctors", count: stats.doctors, color: "bg-blue-500" },
          { label: "Staff", count: stats.staff, color: "bg-purple-500" },
        ].map((s) => (
          <motion.div key={s.label} variants={slideUp} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-3 ${s.color}`}>
              {s.label}
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{s.count}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* User Table */}
      <motion.div variants={slideUp} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Registered Users</h2>
          </div>
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 text-sm text-primary hover:text-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : users.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <p>No users found. Make sure the backend server is running on port 5000.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((u, i) => (
                  <tr key={u.email} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500">{i + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${roleColor(u.role)}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(u.email)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
