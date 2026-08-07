import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Users, TrendingUp, DollarSign } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

// Animated Counter Component
function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(Math.floor(start + (end - start) * easeProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export function CommandCenter() {
  const { metrics } = useAppContext();

  const cards = [
    { title: 'Documents Processed', value: metrics.documentsProcessed, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { title: 'Global Compliance', value: metrics.complianceScore, suffix: '%', icon: Shield, color: 'text-green-400', bg: 'bg-green-500/20' },
    { title: 'Avg Risk Score', value: metrics.riskScore, icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/20' },
    { title: 'Active Agents', value: metrics.activeAgents, icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Live Executive Dashboard</h2>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Healthy
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 flex flex-col gap-4 relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <h3 className="text-gray-400 text-sm font-medium">{card.title}</h3>
            </div>
            
            <div className="text-4xl font-bold text-white mt-2 flex items-baseline gap-1">
              <AnimatedCounter value={card.value} />
              {card.suffix && <span className="text-2xl text-gray-500">{card.suffix}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Processing Volume (30 Days)</h3>
            <TrendingUp className="w-5 h-5 text-gray-500" />
          </div>
          <div className="h-64 flex items-end gap-2">
            {/* Simulated Bar Chart */}
            {[40, 60, 45, 80, 50, 90, 70, 85, 60, 95, 100, 80].map((height, i) => (
              <div key={i} className="flex-1 bg-surface rounded-t-sm relative group hover:bg-primary/50 transition-colors" style={{ height: `${height}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {Math.floor(height * 23.4)} docs
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Cost Savings</h3>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Estimated Review Time Saved</p>
              <p className="text-3xl font-bold text-white flex items-baseline gap-2">
                <AnimatedCounter value={472} /> <span className="text-sm text-gray-500 font-normal">hours</span>
              </p>
            </div>
            
            <div className="h-px bg-white/10"></div>
            
            <div>
              <p className="text-sm text-gray-400 mb-1">Legal Fees Avoided</p>
              <p className="text-3xl font-bold text-green-400 flex items-baseline gap-1">
                $ <AnimatedCounter value={124500} />
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
