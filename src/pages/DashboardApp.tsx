import { useState, useMemo } from 'react';
import { useFinancialSimulation } from '../hooks/useFinancialSimulation';
import { getAIRecommendations } from '../lib/finance-utils';
import { HorizonCanvas } from '../components/Horizon/HorizonCanvas';
import { ControlPanel } from '../components/Horizon/ControlPanel';
import { StatsDashboard } from '../components/Horizon/StatsDashboard';
import { ScenarioComparison } from '../components/Horizon/ScenarioComparison';
import { YearlyCashflow } from '../components/Horizon/YearlyCashflow';
import { MilestoneForm } from '../components/Horizon/MilestoneForm';
import { Plus, LayoutDashboard, FileText, Share2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import "@fontsource-variable/geist/index.css";
import { useAuthStore } from '../lib/useAuthStore';
import { useNavigate } from 'react-router-dom';

export function DashboardApp() {
  const {
    currentAge,
    initialNetWorth,
    setInitialNetWorth,
    monthlySavings,
    setMonthlySavings,
    annualInterestRate,
    setAnnualInterestRate,
    inflationRate,
    setInflationRate,
    milestones,
    updateMilestone,
    addMilestone,
    lifeEvents,
    projection,
    zoomLevel,
    setZoomLevel,
    stats,
  } = useFinancialSimulation();

  const [savedScenario, setSavedScenario] = useState<{
    projection: any[];
    settings: { savings: number; rate: number };
  } | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);

  const { user } = useAuthStore();
  const navigate = useNavigate();

  const terminalBalance = projection[projection.length - 1]?.balance || 0;

  const aiRecommendations = useMemo(() => {
    return getAIRecommendations(currentAge, monthlySavings, milestones, projection);
  }, [currentAge, monthlySavings, milestones, projection]);

  const handleSaveScenario = () => {
    setSavedScenario({
      projection: [...projection],
      settings: { savings: monthlySavings, rate: annualInterestRate }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-geist print:bg-white print:text-black">
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-10 py-6 flex items-center justify-between sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 print:hidden"
      >
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <LayoutDashboard size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white uppercase">Project Horizon</h1>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Financial Milestone Architecture</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrint}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            title="Export PDF Report"
          >
            <FileText size={20} className="text-white/60" />
          </button>
          <button 
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
            title="Share Life Plan"
          >
            <Share2 size={20} className="text-white/60" />
          </button>
          <button 
            onClick={() => setIsAddingMilestone(true)}
            className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.2rem] transition-all group shadow-xl shadow-blue-600/20"
          >
            <Plus size={20} className="text-white group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-xs font-black uppercase tracking-[0.15em]">New Milestone</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 p-2 pr-5 rounded-[1.2rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
          >
            <img 
              src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} 
              alt="User" 
              className="w-10 h-10 rounded-xl shadow-sm"
            />
            <div className="text-left hidden lg:block">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Account</p>
              <p className="text-sm font-bold text-white/80 leading-none">{user?.name || 'User'}</p>
            </div>
          </button>
        </div>
      </motion.header>

      <MilestoneForm 
        isOpen={isAddingMilestone}
        onClose={() => setIsAddingMilestone(false)}
        onSave={addMilestone}
        initialAge={currentAge + 5}
      />

      {/* Main Content */}
      <main className="px-10 space-y-12 max-w-[1700px] mx-auto pb-32 pt-10">
        
        {/* Tier 1: Canvas Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HorizonCanvas 
            milestones={milestones}
            lifeEvents={lifeEvents}
            projection={projection}
            onUpdateMilestone={updateMilestone}
            zoomLevel={zoomLevel}
            currentAge={currentAge}
          />
        </motion.section>

        {/* Tier 2: Stats Dashboard */}
        <StatsDashboard 
          currentAge={currentAge}
          monthlySavings={monthlySavings}
          annualInterestRate={annualInterestRate}
          milestones={milestones}
          projection={projection}
          stats={stats}
        />

        {/* Tier 3: Controls & Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <section className="space-y-6">
              <div className="px-2">
                <h2 className="text-2xl font-black text-white tracking-tight">What-if Recalculation</h2>
                <p className="text-sm font-medium text-white/30 mt-1">Simulate alternative futures by mutating core financial parameters</p>
              </div>
              <ControlPanel 
                initialNetWorth={initialNetWorth}
                setInitialNetWorth={setInitialNetWorth}
                monthlySavings={monthlySavings}
                setMonthlySavings={setMonthlySavings}
                annualInterestRate={annualInterestRate}
                setAnnualInterestRate={setAnnualInterestRate}
                inflationRate={inflationRate}
                setInflationRate={setInflationRate}
                zoomLevel={zoomLevel}
                setZoomLevel={setZoomLevel}
                terminalBalance={terminalBalance}
                onSaveScenario={handleSaveScenario}
                hasSavedScenario={!!savedScenario}
                onCompare={() => setShowComparison(true)}
              />
            </section>

            <section className="space-y-6">
              <div className="px-2">
                <h2 className="text-2xl font-black text-white tracking-tight">Lifecycle Cashflow Details</h2>
                <p className="text-sm font-medium text-white/30 mt-1">Full year-by-year breakdown of capital accumulation and milestone drawdowns</p>
              </div>
              <YearlyCashflow 
                projection={projection}
                milestones={milestones}
              />
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
             <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 sticky top-32 shadow-2xl">
                <div className="flex items-center gap-3 mb-8 text-blue-400">
                  <Sparkles size={22} strokeWidth={2.5} />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">AI Recommendations</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-[1.8rem] bg-blue-600/10 border border-blue-500/20">
                    <p className="text-sm text-blue-200 leading-relaxed font-medium">
                      {aiRecommendations[0]}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {aiRecommendations.slice(1).map((rec, i) => (
                      <div key={i} className="flex gap-4 p-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <p className="text-xs font-bold text-white/40 leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </aside>
        </div>
      </main>

      <AnimatePresence>
        {showComparison && savedScenario && (
          <ScenarioComparison 
            scenarioA={projection}
            scenarioB={savedScenario.projection}
            settingsA={{ savings: monthlySavings, rate: annualInterestRate }}
            settingsB={savedScenario.settings}
            onClose={() => setShowComparison(false)}
          />
        )}
      </AnimatePresence>

      {/* Decorative Blurs */}
      <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}
