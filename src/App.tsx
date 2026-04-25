import { useState, useMemo } from 'react';
import { useFinancialSimulation } from './hooks/useFinancialSimulation';
import { getAIRecommendations } from './lib/finance-utils';
import { HorizonCanvas } from './components/Horizon/HorizonCanvas';
import { ControlPanel } from './components/Horizon/ControlPanel';
import { StatsDashboard } from './components/Horizon/StatsDashboard';
import { ScenarioComparison } from './components/Horizon/ScenarioComparison';
import { MonthlyBreakdown } from './components/Horizon/MonthlyBreakdown';
import { MilestoneForm } from './components/Horizon/MilestoneForm';
import { Plus, LayoutDashboard, FileText, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import "@fontsource-variable/geist/index.css";

function App() {
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
  const [selectedYear, setSelectedYear] = useState<number | null>(32);

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
        className="p-8 pb-4 flex items-center justify-between sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 print:hidden"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <LayoutDashboard size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight uppercase">Project Horizon</h1>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Financial Milestone Architecture</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrint}
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
            title="Export PDF Report"
          >
            <FileText size={18} className="text-white/60" />
          </button>
          <button 
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
            title="Share Life Plan"
          >
            <Share2 size={18} className="text-white/60" />
          </button>
          <button 
            onClick={() => setIsAddingMilestone(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all group shadow-xl shadow-blue-600/20"
          >
            <Plus size={18} className="text-white group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-xs font-black uppercase tracking-widest">New Milestone</span>
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
      <main className="px-8 space-y-12 max-w-[1600px] mx-auto pb-32 pt-8">
        
        {/* Tier 1: Canvas Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Trajectory Projection</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-bold text-white/40 uppercase">On Track</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="text-[10px] font-bold text-white/40 uppercase">Shortfall Risk</span>
              </div>
            </div>
          </div>
          
          <HorizonCanvas 
            milestones={milestones}
            lifeEvents={lifeEvents}
            projection={projection}
            onUpdateMilestone={updateMilestone}
            onSelectYear={setSelectedYear}
            zoomLevel={zoomLevel}
          />
        </motion.section>

        {/* Tier 2: Stats Dashboard */}
        <section className="space-y-6">
          <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] px-2">Financial Snapshot & Analytics</h2>
          <StatsDashboard 
            currentAge={currentAge}
            initialNetWorth={initialNetWorth}
            stats={stats}
            milestones={milestones}
            projection={projection}
          />
        </section>

        {/* Tier 3: Controls & Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <section className="space-y-6">
              <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] px-2">What-if Scenario Recalculation</h2>
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

            {selectedYear && (
              <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] px-2">Milestone Cash Flow Breakdown</h2>
                <MonthlyBreakdown 
                  year={selectedYear}
                  monthlySavings={monthlySavings}
                  annualInterestRate={annualInterestRate}
                  milestonesInYear={milestones.filter(m => Math.floor(m.age) === selectedYear)}
                  startBalance={projection.find(p => p.age === selectedYear - 1)?.balance || initialNetWorth}
                />
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-6">
             <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32">
                <h3 className="text-sm font-black text-white uppercase mb-4 tracking-tight">AI Strategy Recommendations</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20">
                    <p className="text-xs text-blue-200/80 leading-relaxed italic">
                      {aiRecommendations[0]}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <ul className="text-[10px] font-medium text-white/40 space-y-2">
                      {aiRecommendations.slice(1).map((rec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
             </div>
          </aside>
        </div>
      </main>

      {/* Overlays */}
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

      {/* Decorative Blur */}
      <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Print Only Title */}
      <div className="hidden print:block p-10 text-center">
        <h1 className="text-4xl font-bold">Project Horizon: Personalized Life Plan</h1>
        <p className="text-gray-500 mt-2">Generated for Aditya • Current Age: 28</p>
      </div>
    </div>
  );
}

export default App;
