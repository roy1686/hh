import { motion } from 'framer-motion';
import { Bell, AlertTriangle, ShieldAlert, Info } from 'lucide-react';

export function Notifications() {
  const notifications = [
    { id: 1, title: 'Critical Liability Found', desc: 'Vendor agreement #8992 lacks an indemnity clause.', type: 'critical', time: '10 mins ago', icon: AlertTriangle },
    { id: 2, title: 'GDPR Non-Compliance', desc: 'Employee contract missing explicit data processing consent.', type: 'warning', time: '1 hour ago', icon: ShieldAlert },
    { id: 3, title: 'New Agents Deployed', desc: 'Fraud detection swarm has been upgraded to v2.4.', type: 'info', time: '3 hours ago', icon: Info },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-yellow-400" /> System Notifications
        </h2>
        <button className="text-sm text-gray-400 hover:text-white transition-colors">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif, i) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-panel p-4 flex gap-4 items-start border-l-4 ${notif.type === 'critical' ? 'border-l-red-500 bg-red-500/5' : notif.type === 'warning' ? 'border-l-orange-500 bg-orange-500/5' : 'border-l-blue-500'}`}
          >
            <div className={`p-2 rounded-full ${notif.type === 'critical' ? 'bg-red-500/20 text-red-400' : notif.type === 'warning' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
              <notif.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-white">{notif.title}</h3>
                <span className="text-xs text-gray-500">{notif.time}</span>
              </div>
              <p className="text-sm text-gray-400">{notif.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
