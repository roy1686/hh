import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Files, 
  Network, 
  Workflow, 
  Brain, 
  ShieldAlert, 
  LineChart, 
  FileText, 
  MessageSquare,
  Bell,
  Settings,
  Users,
  Terminal,
  Grid,
  Database,
  Search,
  Zap,
  Menu,
  X,
  Layers
} from 'lucide-react';

const MENU_GROUPS = [
  {
    title: 'Executive',
    items: [
      { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard, path: '/app' },
      { id: 'analytics', label: 'Analytics', icon: LineChart, path: '/app/analytics' },
      { id: 'reports', label: 'AI Reports', icon: FileText, path: '/app/reports' },
    ]
  },
  {
    title: 'Operations',
    items: [
      { id: 'documents', label: 'Document Center', icon: Files, path: '/app/documents' },
      { id: 'workflow', label: 'Workflow', icon: Workflow, path: '/app/workflow' },
      { id: 'builder', label: 'Orchestrator', icon: Layers, path: '/app/builder' },
    ]
  },
  {
    title: 'Intelligence',
    items: [
      { id: 'agents', label: 'Agent Hub', icon: Network, path: '/app/agents' },
      { id: 'copilot', label: 'AI Copilot', icon: MessageSquare, path: '/app/copilot' },
      { id: 'intelligence', label: 'Doc Intelligence', icon: Brain, path: '/app/intelligence' },
      { id: 'architecture', label: 'Architecture', icon: Database, path: '/app/architecture' },
    ]
  },
  {
    title: 'Risk & Audit',
    items: [
      { id: 'compliance', label: 'Compliance', icon: ShieldAlert, path: '/app/compliance' },
      { id: 'risk', label: 'Risk Vectors', icon: ShieldAlert, path: '/app/risk' },
      { id: 'fraud', label: 'Fraud Detection', icon: ShieldAlert, path: '/app/fraud' },
      { id: 'audit', label: 'Audit Trail', icon: Terminal, path: '/app/audit' },
    ]
  },
  {
    title: 'System',
    items: [
      { id: 'users', label: 'Users', icon: Users, path: '/app/users' },
      { id: 'knowledge', label: 'Knowledge Base', icon: Database, path: '/app/knowledge' },
      { id: 'integrations', label: 'Integrations', icon: Grid, path: '/app/integrations' },
      { id: 'settings', label: 'Settings', icon: Settings, path: '/app/settings' },
    ]
  }
];

export function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#010804] text-white flex overflow-hidden font-sans selection:bg-[#D4AF37]/30">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* Floating Sidebar (Glassmorphism Dock style) */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="relative z-20 m-4 rounded-3xl bg-[#031408]/80 backdrop-blur-2xl border border-white/5 flex flex-col transition-all duration-300 ease-in-out shadow-2xl max-h-[calc(100vh-2rem)] h-[calc(100vh-2rem)] overflow-hidden"
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#D4AF37] flex items-center justify-center p-[1px] shrink-0">
              <div className="w-full h-full bg-[#010804] rounded-[7px] flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="font-semibold text-lg tracking-wider whitespace-nowrap"
              >
                DOCUGUARD <span className="text-[#D4AF37]">AI</span>
              </motion.span>
            )}
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-4 px-3 space-y-6">
          {MENU_GROUPS.map((group, i) => (
            <div key={i}>
              {isSidebarOpen && (
                <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  {group.title}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map(item => {
                  const isActive = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 relative group overflow-hidden
                        ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}
                      `}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-[#10B981]/20 to-transparent border-l-2 border-[#10B981] z-0"
                        />
                      )}
                      <item.icon className={`w-5 h-5 shrink-0 relative z-10 transition-colors ${isActive ? 'text-[#10B981]' : 'group-hover:text-[#D4AF37]'}`} />
                      
                      {isSidebarOpen && (
                        <span className="text-sm font-medium whitespace-nowrap relative z-10">{item.label}</span>
                      )}

                      {!isSidebarOpen && (
                         <div className="absolute left-14 bg-[#031408] border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                           {item.label}
                         </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10 min-h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 md:h-24 px-8 flex items-center justify-between shrink-0">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative group max-w-md w-full hidden md:block">
              <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#D4AF37] transition-colors" />
              <input 
                type="text" 
                placeholder="Ask AI Copilot to find any contract, clause, or risk..."
                className="w-full bg-[#031408]/50 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-[#031408] transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-gray-500 border border-white/5">⌘</span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-gray-500 border border-white/5">K</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-xs font-medium text-[#10B981] uppercase tracking-wider">Agents Active</span>
            </div>
            
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-xl hover:bg-white/5">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#010804]"></span>
            </button>
            
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#10B981] to-[#D4AF37] p-[2px] cursor-pointer">
              <div className="w-full h-full rounded-full bg-[#010804] flex items-center justify-center">
                <span className="text-xs font-bold text-white">SC</span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
