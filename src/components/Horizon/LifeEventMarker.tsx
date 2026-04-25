import React from 'react';

interface LifeEventMarkerProps {
  label: string;
  age: number;
  icon: string;
  x: number;
}

export const LifeEventMarker: React.FC<LifeEventMarkerProps> = ({
  label,
  age,
  icon,
  x,
}) => {
  return (
    <div 
      className="absolute flex flex-col items-center pointer-events-none z-0"
      style={{ left: x, top: 40 }}
      title={`Age ${age}`}
    >
      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg shadow-sm opacity-60">
        {icon}
      </div>
      <div className="w-px h-[320px] bg-white/5" />
      <div className="mt-2 opacity-40 text-center">
        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
};
