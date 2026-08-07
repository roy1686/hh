import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

export function Analytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-blue-400" /> Enterprise Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mock Line Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6">
          <h3 className="font-semibold text-white mb-6">Document Volume (YTD)</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[30, 45, 60, 40, 70, 85, 90, 65, 80, 100].map((h, i) => (
              <div key={i} className="w-full bg-blue-500/20 rounded-t hover:bg-blue-500/40 transition-colors relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {h * 123} Docs
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span>Jan</span>
            <span>May</span>
            <span>Oct</span>
          </div>
        </motion.div>

        {/* Mock Risk Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6">
          <h3 className="font-semibold text-white mb-6">Risk Category Distribution</h3>
          <div className="space-y-6 mt-8">
            {[
              { label: 'Financial Liability', percent: 45, color: 'bg-red-500' },
              { label: 'Data Privacy (GDPR)', percent: 30, color: 'bg-orange-500' },
              { label: 'Intellectual Property', percent: 15, color: 'bg-yellow-500' },
              { label: 'Employment Law', percent: 10, color: 'bg-blue-500' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="text-gray-400">{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
