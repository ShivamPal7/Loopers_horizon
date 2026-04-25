import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, type User } from '@/lib/useAuthStore';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  Command,
  Globe,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate auth
    const dummyUser: User = {
      id: crypto.randomUUID(),
      name: isLogin ? 'Aditya' : name,
      email: email,
      joinedDate: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };

    login(dummyUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative z-10"
      >
        {/* Left Side: Brand & Visuals */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-r border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-5 h-5 border-2 border-blue-600 rounded-full relative">
                <div className="absolute top-1/2 left-full w-4 h-0.5 bg-blue-600/50 -translate-y-1/2" />
              </div>
            </div>
            <span className="font-black text-2xl tracking-tighter text-white">HORIZON</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-black text-white leading-tight">
              Control your <br />
              <span className="text-blue-400">financial story.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-sm font-medium">
              Join thousands of users planning their future with precision and style.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img
                  key={i}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                  className="w-10 h-10 rounded-full border-2 border-[#0F172A]"
                  alt="User"
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              +2k Users Joined
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white">
                  {isLogin ? 'Welcome back' : 'Create account'}
                </h2>
                <p className="text-slate-400 font-medium">
                  {isLogin ? 'Enter your details to access your plan.' : 'Start your life journey with us today.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label className="text-slate-400 text-xs font-black uppercase tracking-widest ml-1">Full Name</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                      <Input
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/5 border-white/10 text-white pl-12 h-14 rounded-2xl focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-black uppercase tracking-widest ml-1">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 text-white pl-12 h-14 rounded-2xl focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <Label className="text-slate-400 text-xs font-black uppercase tracking-widest">Password</Label>
                    {isLogin && <button type="button" className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300">Forgot?</button>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/5 border-white/10 text-white pl-12 h-14 rounded-2xl focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg shadow-xl shadow-blue-600/20 group">
                  {isLogin ? 'Login to Horizon' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-slate-500 font-black tracking-widest">Or continue with</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10">
                  <Globe className="w-4 h-4 mr-2" /> Google
                </Button>
                <Button variant="outline" className="h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10">
                  <Command className="w-4 h-4 mr-2" /> Github
                </Button>
              </div>

              <p className="text-center text-slate-400 text-sm font-medium">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 font-black hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
