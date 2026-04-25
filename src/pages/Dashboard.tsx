import { useState } from 'react';
import { useHorizonStore } from '@/lib/useHorizonStore';
import { useAuthStore } from '@/lib/useAuthStore';
import { Timeline } from '@/components/Timeline';
import { ProjectionChart } from '@/components/ProjectionChart';
import { ScenarioPanel } from '@/components/ScenarioPanel';
import { StatsCard } from '@/components/StatsCard';
import { ScenarioComparison } from '@/components/ScenarioComparison';
import { MonthlyBreakdown } from '@/components/MonthlyBreakdown';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  ArrowRightLeft, 
  FileText, 
  Table, 
  ChevronRight,
  Sparkles,
  User as UserIcon,
  LogOut,
  Settings
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Dashboard() {
  const { 
    settings, 
    milestones, 
    projectionData, 
    updateSettings,
    addMilestone 
  } = useHorizonStore();
  
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [showComparison, setShowComparison] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleAddMilestone = () => {
    addMilestone({
      label: 'New Goal',
      targetAge: settings.currentAge + 10,
      cost: 5000000,
      category: 'travel',
      priority: 'medium'
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#10B981', '#FBBF24']
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <header className="bg-white/80 border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md print:hidden">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              <div className="w-5 h-5 border-2 border-white rounded-full relative">
                <div className="absolute top-1/2 left-full w-4 h-0.5 bg-white/50 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <span className="font-black text-2xl tracking-tighter block leading-none">HORIZON</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Life Planner</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4">
              <button 
                onClick={() => setShowComparison(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <ArrowRightLeft className="w-4 h-4" /> Compare
              </button>
              <button 
                onClick={() => setShowBreakdown(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <Table className="w-4 h-4" /> Breakdown
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <FileText className="w-4 h-4" /> Export
              </button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                  <img 
                    src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} 
                    alt="User" 
                    className="w-8 h-8 rounded-xl shadow-sm"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Account</p>
                    <p className="text-xs font-bold text-slate-700 leading-none">{user?.name || 'User'}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-200 shadow-2xl">
                <DropdownMenuLabel className="px-3 py-2 text-xs font-black text-slate-400 uppercase tracking-widest">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100 mx-2" />
                <DropdownMenuItem onClick={() => navigate('/profile')} className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-blue-50 focus:text-blue-600 font-bold text-sm flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> Profile Details
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-blue-50 focus:text-blue-600 font-bold text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-100 mx-2" />
                <DropdownMenuItem onClick={() => { logout(); navigate('/auth'); }} className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-rose-50 focus:text-rose-600 font-bold text-sm flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 print:block">
        <div className="space-y-20">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Visualizing your future
            </div>
            <h1 className="text-6xl font-black tracking-tight text-slate-900 leading-[0.95] max-w-3xl">
              Map your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">financial destiny</span>.
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
              Horizon transforms abstract numbers into a concrete life path. 
              Plan milestones, simulate growth, and secure your freedom.
            </p>
          </motion.div>

          {/* Timeline Section */}
          <section className="space-y-8 relative">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  Life Timeline
                  <span className="text-[11px] font-black bg-blue-600 text-white px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-100">
                    Age 20-80
                  </span>
                </h2>
                <p className="text-sm text-slate-400 font-medium mt-1">Drag and drop markers to adjust your life plan</p>
              </div>
              <button 
                onClick={handleAddMilestone}
                className="group flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                <span className="text-sm font-black">Add Goal</span>
              </button>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100/50">
              <Timeline 
                milestones={milestones} 
                currentAge={settings.currentAge} 
                lifeExpectancy={settings.lifeExpectancy}
                onSelectAge={() => {}}
              />
            </div>
          </section>

          {/* Stats Section */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Executive Dashboard</h2>
              <p className="text-sm text-slate-400 font-medium mt-1">Real-time performance metrics for your life strategy</p>
            </div>
            <StatsCard 
              settings={settings} 
              milestones={milestones} 
              projectionData={projectionData} 
            />
          </section>

          {/* Projection Chart Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight">Growth Projection</h2>
                <p className="text-sm text-slate-400 font-medium mt-1">Cumulative wealth over time including compounding and withdrawals</p>
              </div>
            </div>
            <div className="bg-white p-2 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100/50 overflow-hidden">
              <div className="h-[450px] w-full">
                <ProjectionChart 
                  data={projectionData} 
                  milestones={milestones} 
                  currentAge={settings.currentAge} 
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-10 print:hidden">
          <ScenarioPanel 
            settings={settings} 
            onChange={updateSettings} 
          />
          
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-blue-500/30 transition-colors" />
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Estimated Wealth at {settings.lifeExpectancy}</p>
            <h3 className="text-4xl font-black tracking-tight">
              ₹{(projectionData[projectionData.length - 1]?.balance / 10000000).toFixed(2)} Cr
            </h3>
            
            <button 
              onClick={() => setShowComparison(true)}
              className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20 active:scale-95"
            >
              Analyze Scenarios <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </aside>
      </main>

      {/* Modals */}
      <ScenarioComparison 
        currentSettings={settings}
        milestones={milestones}
        open={showComparison}
        onOpenChange={setShowComparison}
      />
      <MonthlyBreakdown 
        settings={settings}
        milestones={milestones}
        age={settings.currentAge + 5}
        open={showBreakdown}
        onOpenChange={setShowBreakdown}
      />

      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          body { background: white; }
          main { max-width: 100% !important; padding: 0 !important; }
          section { page-break-inside: avoid; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
