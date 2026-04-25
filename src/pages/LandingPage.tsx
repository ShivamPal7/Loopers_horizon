import { motion } from 'framer-motion';
import { ArrowRight, LayoutDashboard, Target, TrendingUp, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-geist overflow-hidden relative">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <LayoutDashboard size={24} className="text-white" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight uppercase block leading-none">HORIZON</span>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Project</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/auth')}
            className="px-6 py-2.5 text-sm font-black text-white/80 hover:text-white transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/auth')}
            className="px-6 py-2.5 text-sm font-black bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-8 text-center max-w-[1000px] mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            The Future of Financial Planning
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95]">
            Map your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              financial destiny.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed">
            Project Horizon transforms abstract numbers into a concrete life path. 
            Simulate your wealth trajectory, plan major life events, and secure your freedom with unparalleled precision.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button 
              onClick={() => navigate('/auth')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all shadow-xl shadow-blue-600/20 group"
            >
              <span className="text-sm font-black uppercase tracking-widest">Start Planning</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/auth')}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-sm font-black uppercase tracking-widest text-white/80 hover:text-white"
            >
              View Demo
            </button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full text-left"
        >
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Target size={24} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Milestone Architecture</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Drag and drop major life events onto your timeline. Visualize exactly how a house purchase or career change impacts your trajectory.
            </p>
          </div>
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={24} className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-time Simulation</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Instantly see the compound effect of your savings rate, inflation, and market returns on your terminal wealth.
            </p>
          </div>
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Shield size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Strategy Engine</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Receive dynamic, intelligent recommendations based on your current trajectory to prevent shortfall risks.
            </p>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-32 py-12 px-8 text-center">
        <p className="text-white/30 text-xs font-black uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Project Horizon. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
