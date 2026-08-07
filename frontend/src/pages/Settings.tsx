import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Brain, Shield, Sliders } from 'lucide-react';

export function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <SettingsIcon className="w-6 h-6 text-gray-400" /> AI Configuration
      </h2>

      <div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-purple-400" /> Language Model Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Primary Engine</label>
              <select className="w-full bg-surface border border-white/10 rounded-lg p-2 text-white outline-none">
                <option>Gemini 3.5 Flash (Recommended)</option>
                <option>Gemini 1.5 Pro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Agent Autonomy Level</label>
              <input type="range" className="w-full accent-purple-500" min="1" max="100" defaultValue="75" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Human-in-the-loop Required</span>
                <span>Fully Autonomous</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6">
          <h3 className="font-semibold text-white flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-red-400" /> Risk Thresholds
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-white/5 rounded-lg">
              <div>
                <div className="text-sm text-white">Auto-Flag High Risk</div>
                <div className="text-xs text-gray-500">Halt workflow if risk score &gt; 80</div>
              </div>
              <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border border-white/5 rounded-lg">
              <div>
                <div className="text-sm text-white">Strict Compliance Mode</div>
                <div className="text-xs text-gray-500">Require 100% rule pass for approval</div>
              </div>
              <div className="w-10 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
