import { motion } from 'framer-motion';
import { Grid, MessageSquare, Briefcase, Mail } from 'lucide-react';

export function Integrations() {
  const apps = [
    { name: 'Slack', icon: MessageSquare, color: 'text-purple-400', desc: 'Send AI risk alerts directly to Slack channels.', connected: true },
    { name: 'Salesforce', icon: Briefcase, color: 'text-blue-400', desc: 'Sync MSA audits with Salesforce accounts.', connected: false },
    { name: 'Outlook', icon: Mail, color: 'text-blue-500', desc: 'Auto-ingest email attachments for AI review.', connected: false },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Grid className="w-6 h-6 text-orange-400" /> Integration Marketplace
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-surface rounded-xl border border-white/5">
                <app.icon className={`w-6 h-6 ${app.color}`} />
              </div>
              <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${app.connected ? 'bg-green-500' : 'bg-gray-700'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${app.connected ? 'right-1' : 'left-1'}`}></div>
              </div>
            </div>
            <h3 className="font-semibold text-white mb-2">{app.name}</h3>
            <p className="text-sm text-gray-400">{app.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
