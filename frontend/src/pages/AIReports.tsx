import { motion } from 'framer-motion';
import { ClipboardList, Download, FileText, Calendar } from 'lucide-react';

export function AIReports() {
  const reports = [
    { id: 1, name: 'Q3 Vendor Liability Summary', type: 'Risk Audit', date: '2026-08-01', status: 'Generated' },
    { id: 2, name: 'Employee Contract GDPR Scan', type: 'Compliance', date: '2026-08-03', status: 'Generated' },
    { id: 3, name: 'M&A Due Diligence - Target Alpha', type: 'Comprehensive', date: '2026-08-05', status: 'Generated' },
    { id: 4, name: 'Weekly Ingestion Log', type: 'System', date: '2026-08-07', status: 'Processing...' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-green-400" /> AI Generated Reports
        </h2>
        <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/50 rounded-lg hover:bg-primary/30 transition-colors font-medium text-sm">
          Generate Custom Report
        </button>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-surface/50">
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Report Name</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Type</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Date</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, i) => (
                <motion.tr 
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-white">{report.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-surface rounded text-xs text-gray-300 border border-white/10">{report.type}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {report.date}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${report.status === 'Generated' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-surface rounded-lg text-gray-400 hover:text-white transition-colors" disabled={report.status !== 'Generated'}>
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
