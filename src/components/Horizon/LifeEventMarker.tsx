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
      className="absolute bottom-16 -translate-x-1/2 flex flex-col items-center group pointer-events-none"
      style={{ left: x }}
    >
      <div className="mb-2 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-500">
        <span className="text-sm">{icon}</span>
      </div>
      
      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[9px] font-bold text-white whitespace-nowrap mb-1">
        {label} (Age {age})
      </div>

      <div className="w-px h-12 bg-white/10 group-hover:bg-white/30 transition-colors" />
    </div>
  );
};
