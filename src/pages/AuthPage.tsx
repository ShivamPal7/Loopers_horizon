import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, type User } from '@/lib/useAuthStore';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function AuthPage() {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dummyUser: User = {
      id: crypto.randomUUID(),
      name: isLogin ? email.split('@')[0] : name,
      email,
      joinedDate: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    login(dummyUser);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-primary-foreground rounded-full" />
            </div>
            <span className="font-bold text-lg tracking-tight">HORIZON</span>
          </button>
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-foreground underline underline-offset-4 hover:no-underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-[1400px] mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-64px)]">

        {/* Left branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hidden lg:flex flex-col gap-10"
        >
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-foreground tracking-tight leading-[0.95]">
              {isLogin ? 'Welcome back.' : 'Start your journey.'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              {isLogin
                ? 'Log back in to continue building your life plan with precision and clarity.'
                : 'Join thousands of users planning their future with milestones, projections, and real-time simulations.'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`}
                  className="w-10 h-10 rounded-xl border-2 border-background shadow-sm bg-muted" alt="User" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">+2k Users Planning Their Future</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Milestones Tracked', value: '50k+' },
              { label: 'Avg. Savings Growth', value: '23%' },
              { label: 'Goals Achieved', value: '8.4k' },
            ].map((s) => (
              <Card key={s.label} className="border-border">
                <CardContent className="pt-5 pb-4 px-5">
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            {isLogin ? (
              /* ── LOGIN FORM — exact shadcn structure ── */
              <div className={cn("flex flex-col gap-6")}>
                <Card>
                  <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      {/* Email field */}
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      {/* Password field */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                          </a>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full">Login</Button>
                        <Button variant="outline" type="button" className="w-full">
                          <Globe className="w-4 h-4 mr-2" /> Login with Google
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                          Don't have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setIsLogin(false)}
                            className="underline underline-offset-4 hover:no-underline text-foreground font-medium"
                          >
                            Sign up
                          </button>
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* ── SIGNUP FORM ── */
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Enter your information below to create your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" type="text" placeholder="John Doe" required
                        value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@example.com" required
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                      <p className="text-sm text-muted-foreground">
                        We'll use this to contact you. We will not share your email with anyone else.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                      <p className="text-sm text-muted-foreground">Must be at least 8 characters long.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" required
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                      <p className="text-sm text-muted-foreground">Please confirm your password.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Button type="submit" className="w-full">Create Account</Button>
                      <Button variant="outline" type="button" className="w-full">
                        <Globe className="w-4 h-4 mr-2" /> Sign up with Google
                      </Button>
                      <p className="text-center text-sm text-muted-foreground px-6">
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => setIsLogin(true)}
                          className="underline underline-offset-4 hover:no-underline text-foreground font-medium"
                        >
                          Sign in
                        </button>
                      </p>
                    </div>

                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
