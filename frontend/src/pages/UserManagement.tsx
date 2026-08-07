import { motion } from 'framer-motion';
import { Users, Shield, UserPlus } from 'lucide-react';

export function UserManagement() {
  const users = [
    { id: 1, name: 'Sarah Connor', role: 'System Admin', email: 'sarah@docuguard.ai', status: 'Active' },
    { id: 2, name: 'John Smith', role: 'Legal Reviewer', email: 'john@docuguard.ai', status: 'Active' },
    { id: 3, name: 'Alice Wong', role: 'Compliance Officer', email: 'alice@docuguard.ai', status: 'Offline' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-400" /> User Management
        </h2>
        <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary/30 transition-colors font-medium text-sm flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-surface/50">
              <th className="p-4 text-xs font-semibold text-gray-400 uppercase">User</th>
              <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Role</th>
              <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Manage</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <motion.tr 
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{user.name}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-surface border border-white/10 rounded text-xs text-gray-300 flex items-center w-max gap-1">
                    <Shield className="w-3 h-3 text-primary" /> {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className="flex items-center gap-2 text-sm text-gray-400">
                    <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-sm text-primary hover:underline">Edit Access</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
