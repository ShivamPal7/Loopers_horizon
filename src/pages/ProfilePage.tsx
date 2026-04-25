import { useState } from 'react';
import { useAuthStore } from '@/lib/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  LogOut, 
  ChevronLeft,
  Camera,
  Shield,
  Bell,
  Wallet
} from 'lucide-react';

export function ProfilePage() {
  const { user, logout, updateProfile } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || 'Passionate about financial freedom.');

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleSave = () => {
    updateProfile({ name, bio });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-geist selection:bg-blue-500/30">
      {/* Header */}
      <header className="bg-[#050505]/80 border-b border-white/5 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white/60 hover:text-white font-bold transition-colors text-sm"
          >
            <ChevronLeft className="w-5 h-5" /> Back to Horizon
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">Profile</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12 space-y-12">
        {/* Profile Card */}
        <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-[100px]" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#050505]">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-3 -right-3 p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all active:scale-95 border border-white/10">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left space-y-6 w-full">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-black tracking-tight">{user.name}</h1>
                  <p className="text-white/40 font-medium mt-1">{user.email}</p>
                </div>
                <div className="flex items-center justify-center md:justify-end gap-3">
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all border ${isEditing ? 'bg-white text-black border-white hover:bg-white/90' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                  <button 
                    onClick={() => {
                      logout();
                      navigate('/auth');
                    }}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-5 pt-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Display Name</label>
                    <input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl bg-[#050505] border border-white/10 h-14 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Bio</label>
                    <input 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full rounded-2xl bg-[#050505] border border-white/10 h-14 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <button onClick={handleSave} className="w-full h-14 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-white shadow-xl shadow-blue-600/20 transition-all">
                    Apply Updates
                  </button>
                </div>
              ) : (
                <p className="text-white/60 font-medium leading-relaxed max-w-xl">
                  {user.bio || bio}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60">
                  <Calendar className="w-3 h-3" /> Joined {new Date(user.joinedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  <Shield className="w-3 h-3" /> Verified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white mb-2">Notifications</h3>
            <p className="text-sm text-white/40 leading-relaxed">Manage your milestone alerts and weekly summaries.</p>
          </div>
          
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white mb-2">Security</h3>
            <p className="text-sm text-white/40 leading-relaxed">Update your password and 2FA settings.</p>
          </div>
          
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white mb-2">Billing</h3>
            <p className="text-sm text-white/40 leading-relaxed">Manage your Horizon Pro subscription.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
